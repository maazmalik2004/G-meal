const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function generateRecipe(preferencesData) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const numberOfMeals = preferencesData.mealSchedule === 'weekly' ? 1 : 3;
    const frequencyMeals = preferencesData.mealFrequency

    const prompt = `I want you to recommend  ${numberOfMeals} for ${frequencyMeals}  number of meals per day from ${preferencesData.date} to ${numberOfMeals}days from the ${preferencesData.date}, based on the following criteria "
    "Person age: ${preferencesData.age}"
    "Person gender: ${preferencesData.gender}"
    "Person weight: ${preferencesData.weight}"
    "Person height: ${preferencesData.height}cm"
    "Person veg_or_nonveg: ${preferencesData.dietType}"
    "Person mealFrequency: ${preferencesData.mealFrequency} times a day"
    "Person mealSchedule: ${preferencesData.mealSchedule}"
    "Person startingDate: ${preferencesData.date}"
    "do it in a format where it would be easier for me to convert in json format
    The output format should be exactly like this no extra lines ,no extra set of punctuations.
    {
        "menu": [
          {
            "date": "2024-04-27",
            "breakfast": [
              {"dish": "Scrambled eggs", "calorie": 220},
              {"dish": "Toast", "calorie": 100},
              {"dish": "Fruit salad", "calorie": 120}
            ],
            "brunch": [
              {"dish": "Egg and avocado toast", "calorie": 300},
              {"dish": "Smoothie", "calorie": 150},
              {"dish": "Granola", "calorie": 200}
            ],
            "lunch": [
              {"dish": "Grilled chicken salad", "calorie": 350},
              {"dish": "Vegetable soup", "calorie": 180},
              {"dish": "Quinoa salad", "calorie": 280}
            ],
            "dinner": [
              {"dish": "Salmon with roasted vegetables", "calorie": 400},
              {"dish": "Pasta with marinara sauce", "calorie": 320},
              {"dish": "Stir-fried tofu with rice", "calorie": 280}
            ]
          },
          {
            "date": "2024-04-28",
            "breakfast": [
              {"dish": "Pancakes", "calorie": 250},
              {"dish": "Bacon", "calorie": 180},
              {"dish": "Orange juice", "calorie": 120}
            ],
            "brunch": [
              {"dish": "Egg benedict", "calorie": 400},
              {"dish": "Fruit platter", "calorie": 180},
              {"dish": "Croissant", "calorie": 200}
            ],
            "lunch": [
              {"dish": "Turkey sandwich", "calorie": 350},
              {"dish": "Caesar salad", "calorie": 220},
              {"dish": "Tomato soup", "calorie": 150}
            ],
            "dinner": [
              {"dish": "Steak with mashed potatoes", "calorie": 500},
              {"dish": "Vegetable stir-fry", "calorie": 300},
              {"dish": "Ratatouille", "calorie": 250}
            ]
          }
        ]
      }
       however the number of days can vary`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

module.exports = generateRecipe;
