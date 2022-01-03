// Storage Controller
const StorageCtrl = (function () {
  const key = "tracalorie-items"

  return {
    setStore: () => {
      localStorage.setItem(key, JSON.stringify([]))
      return []
    },

    getStore: () => {
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : StorageCtrl.setStore()
    },
    updateStore: items => localStorage.setItem(key, JSON.stringify(items)),
  }
})()

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }

  // Data Structure / State
  const data = {
    items: StorageCtrl.getStore(),
    currentItem: null,
    totalCalories: 0,
  }

  return {
    getItems: () => data.items,

    addItem: (name, calories) => {
      // create unique id
      let ID
      data.items.length > 0
        ? (ID = data.items[data.items.length - 1].id + 1)
        : (ID = 0)

      // calories to number
      calories = parseInt(calories)

      // create new item
      const newItem = new Item(ID, name, calories)

      // add to items array
      data.items.push(newItem)

      // return new item
      return newItem
    },

    getTotalCalories: () => {
      let total = 0
      data.items.forEach(item => (total += item.calories))
      data.totalCalories = total
      return data.totalCalories
    },

    getItemById: id => {
      let found = null
      data.items.forEach(item => {
        if (item.id === id) found = item
      })
      return found
    },

    updateItem: (name, calories) => {
      calories = parseInt(calories)

      let found = null
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name
          item.calories = calories
          found = item
        }
      })
      return found
    },

    deleteItem: id => {
      // get ids
      ids = data.items.map(item => item.id)

      // get index of item
      const index = ids.indexOf(id)

      // delete item
      data.items.splice(index, 1)
      data.currentItem = null
    },

    clearAllItems: () => (data.items = []),

    setCurrentItem: item => (data.currentItem = item),

    getCurrentItem: () => data.currentItem,

    logData: () => data,
  }
})()

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    cardTitle: document.querySelector(".card-title"),
    clearAllBtn: document.querySelector(".clear-btn"),
    itemNameInput: document.getElementById("item-name"),
    itemCaloriesInput: document.getElementById("item-calories"),
    addBtn: document.querySelector(".add-btn"),
    updateBtn: document.querySelector(".update-btn"),
    removeBtn: document.querySelector(".remove-btn"),
    backBtn: document.querySelector(".back-btn"),
    totalCalories: document.querySelector(".total-calories"),
    itemList: document.getElementById("item-list"),
  }

  return {
    populateItemList: items => {
      let html = ""
      // create list items
      items.forEach(item => {
        html += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}:</strong> <em>${item.calories} calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item far fa-edit"></i>
            </a>
          </li>
        `
      })
      // insert list items
      UISelectors.itemList.innerHTML = html
    },

    getItemInput: () => {
      return {
        name: UISelectors.itemNameInput.value,
        calories: UISelectors.itemCaloriesInput.value,
      }
    },

    addListItem: item => {
      // make sure list isn't hidden
      UISelectors.itemList.style.display = "block"

      // create li
      const li = `
        <li id="item-${item.id}" class="collection-item">
          <strong>${item.name}:</strong> <em>${item.calories} calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item far fa-edit"></i>
          </a>
        </li>
      `
      // insert to list
      UISelectors.itemList.innerHTML += li
    },

    updateListItem: item => {
      // turn list items node list into array
      let listItems = Array.from(UISelectors.itemList.children)

      // find the targeted item and update its inner html
      listItems.forEach(li => {
        if (li.id === `item-${item.id}`) {
          document.querySelector(`#${li.id}`).innerHTML = `
              <strong>${item.name}:</strong> <em>${item.calories} calories</em>
              <a href="#" class="secondary-content">
                <i class="edit-item far fa-edit"></i>
              </a>
          `
        }
      })
    },

    removeListItem: id => {
      const itemId = `item-${id}`
      document.getElementById(itemId).remove()
    },

    clearAllListItems: () => {
      UISelectors.itemList.innerHTML = ""
      UICtrl.clearEditState()
    },

    clearInputFields: () => {
      UISelectors.itemNameInput.value = ""
      UISelectors.itemCaloriesInput.value = ""
    },

    addItemToForm: () => {
      const item = ItemCtrl.getCurrentItem()
      UISelectors.itemNameInput.value = item.name
      UISelectors.itemCaloriesInput.value = item.calories
      // move labels out of input fields
      $(M.updateTextFields())
      UICtrl.showEditState()
    },

    hideList: () => {
      UISelectors.itemList.style.display = "none"
    },

    showTotalCalories: totalCalories => {
      UISelectors.totalCalories.textContent = totalCalories
    },

    clearEditState: () => {
      UICtrl.clearInputFields()
      UISelectors.cardTitle.textContent = "Add Meal / Food Item"
      UISelectors.updateBtn.style.display = "none"
      UISelectors.removeBtn.style.display = "none"
      UISelectors.backBtn.style.display = "none"
      UISelectors.addBtn.style.display = "inline"
    },

    showEditState: () => {
      UISelectors.cardTitle.textContent = "Update Meal / Food Item"
      UISelectors.updateBtn.style.display = "inline"
      UISelectors.removeBtn.style.display = "inline"
      UISelectors.backBtn.style.display = "inline"
      UISelectors.addBtn.style.display = "none"
    },

    getSelectors: () => UISelectors,
  }
})()

// App Controller
const AppCtrl = (function (StorageCtrl, ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors()
    // add item event
    UISelectors.addBtn.addEventListener("click", itemAddSubmit)
    // disable submit on enter
    document.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        e.preventDefault()
        return false
      }
    })
    // edit item event
    UISelectors.itemList.addEventListener("click", itemEditClick)
    // update item event
    UISelectors.updateBtn.addEventListener("click", itemUpdateSubmit)
    // remove item event
    UISelectors.removeBtn.addEventListener("click", itemRemoveSubmit)
    // back button event
    UISelectors.backBtn.addEventListener("click", UICtrl.clearEditState)
    // clear all event
    UISelectors.clearAllBtn.addEventListener("click", clearAllItemsClick)
  }

  // item add submit
  const itemAddSubmit = e => {
    e.preventDefault()

    // get form input from UI Controller
    const input = UICtrl.getItemInput()

    // validate input
    if (input.name === "" || input.calories === "") {
      // invalid
      return alert("invalid form input fields")
    } else {
      // create new item, get total calories
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      const totalCalories = ItemCtrl.getTotalCalories()
      // add item to list, update total calories, clear input fields
      UICtrl.addListItem(newItem)
      UICtrl.showTotalCalories(totalCalories)
      UICtrl.clearInputFields()
      // update local storage
      StorageCtrl.updateStore(ItemCtrl.getItems())
    }
  }

  // item edit click
  const itemEditClick = e => {
    e.preventDefault()

    // validate event target
    if (e.target.classList.contains("edit-item")) {
      // get item by id
      const id = parseInt(e.target.parentNode.parentNode.id.split("-")[1])
      const item = ItemCtrl.getItemById(id)

      // set current item
      ItemCtrl.setCurrentItem(item)

      // show item in edit state
      UICtrl.addItemToForm()
    }
  }

  // item update submit
  const itemUpdateSubmit = e => {
    e.preventDefault()

    // get item input
    const input = UICtrl.getItemInput()

    // update item and total calories in data structure and UI
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
    const totalCalories = ItemCtrl.getTotalCalories()
    UICtrl.updateListItem(updatedItem)
    UICtrl.showTotalCalories(totalCalories)

    // clear edit state
    UICtrl.clearEditState()

    // update local storage
    StorageCtrl.updateStore(ItemCtrl.getItems())
  }

  // item remove submit
  const itemRemoveSubmit = e => {
    e.preventDefault()

    // get current item
    const currentItem = ItemCtrl.getCurrentItem()

    // delete from UI and data structure
    UICtrl.removeListItem(currentItem.id)
    ItemCtrl.deleteItem(currentItem.id)

    // clear edit state and update total calories
    UICtrl.clearEditState()
    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories())

    // hide list if empty
    UICtrl.getSelectors().itemList.children.length === 0 && UICtrl.hideList()

    // update local storage
    StorageCtrl.updateStore(ItemCtrl.getItems())
  }

  // clear all items event
  const clearAllItemsClick = e => {
    e.preventDefault()

    // clear items from data structure and ui, hide list, update total calories
    ItemCtrl.clearAllItems()
    UICtrl.clearAllListItems()
    UICtrl.hideList()
    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories())

    // update local storage
    StorageCtrl.updateStore(ItemCtrl.getItems())
  }

  return {
    init: () => {
      console.log("initializing app...")

      // make sure edit state is initially cleared
      UICtrl.clearEditState()

      // fetch items and total calories from ItemCtrl
      const items = ItemCtrl.getItems(),
        totalCalories = ItemCtrl.getTotalCalories()

      // hide list if no items, otherwise populate list with items
      items.length === 0 ? UICtrl.hideList() : UICtrl.populateItemList(items)

      // show total calories
      UICtrl.showTotalCalories(totalCalories)

      // load event listeners
      loadEventListeners()
    },
  }
})(StorageCtrl, ItemCtrl, UICtrl)

// Initialize App
AppCtrl.init()
