import { createContext, useEffect, useState } from "react";
import { food_list,menu_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [ordersData,setOrdersData] = useState({});
    
    const [plan, setPlan] = useState([
        {
          "date": "2024-04-28",
          "breakfast": [
            {"dish": "Raisin Bran", "calorie": 265},
            {"dish": "Banana", "calorie": 100},
            {"dish": "Skim Milk", "calorie": 90}
          ],
          "brunch": [
            {"dish": "Cucumber Sandwich", "calorie": 150},
            {"dish": "Mixed Fruit", "calorie": 110},
            {"dish": "Diet Iced Tea", "calorie": 0}
          ],
          "dinner": [
            {"dish": "Teriyaki Salmon with Cauliflower Rice", "calorie": 370},
            {"dish": "Mixed Greens Salad", "calorie": 170},
            {"dish": "Pear Slices", "calorie": 110}
          ]
        },
        {
          "date": "2024-04-29",
          "breakfast": [
            {"dish": "Oatmeal", "calorie": 220},
            {"dish": "Apple", "calorie": 95},
            {"dish": "Almond Milk", "calorie": 60}
          ],
          "brunch": [
            {"dish": "Avocado Toast", "calorie": 300},
            {"dish": "Berry Smoothie", "calorie": 180},
            {"dish": "Green Tea", "calorie": 0}
          ],
          "dinner": [
            {"dish": "Grilled Chicken Breast with Quinoa", "calorie": 400},
            {"dish": "Steamed Broccoli", "calorie": 90},
            {"dish": "Pineapple Slices", "calorie": 70}
          ]
        }
      ]);
      
    const addToCart = (itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product.food_id === Number(item));
            totalAmount += itemInfo.food_price * cartItems[item];
          }
        }
        return totalAmount;
      }

    const placeOrder = (deliveryData) =>{

        console.log(deliveryData);
    }

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        plan,setPlan,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        )

}

export default StoreContextProvider;