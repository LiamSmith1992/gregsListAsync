import { appState } from "../AppState.js";
import { House } from "../Models/house.js";
import { Pop } from "../Utils/Pop.js";








class HousesService {

  setActiveHouse(id) {
    let house = appState.houses.find(h => h.id == id)
    appState.activeHouse = house
    console.log('active', house)
  }

  async getHouses() {
    const result = await axios.get('https://bcw-sandbox.herokuapp.com/API/houses')
    console.log('got data', result.data);
    appState.houses = result.data.map(h => new House(h))
  }

  async createHouse(houseData) {
    const result = await axios.post('https://bcw-sandbox.herokuapp.com/API/houses', houseData)

    appState.houses = [...appState.houses, new House(result.data)]
  }


  async editHouse(houseData, id) {
    const result = axios.get('https://bcw-sandbox.herokuapp.com/API/houses/' + id, houseData)
    let index = appState.houses.findIndex(h => h.id == id)
    appState.houses.splice(index, 1, new House(result.data))
    appState.emit('houses')
  }


  async deleteHouse(id) {
    const result = await axios.delete('https://bcw-sandbox.herokuapp.com/API/houses/' + id)
    Pop.toast(result.data, 'success')
    appState.houses = appState.houses.filter(h => h.id != id)

  }

}





export const housesService = new HousesService()