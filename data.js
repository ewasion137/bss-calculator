const BSS_DATA = {
  ingredients: {
    "Honey": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/c/c6/Honey.png/revision/latest/scale-to-width-down/25?cb=20230410071605.png.jpeg"
    },
    "Gumdrops": {
      "recipe": { "Pineapple": 3, "Strawberry": 3, "Blueberry": 3 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/6f/Gumdrops.png/revision/latest/scale-to-width-down/70?cb=20230404021459.jpeg.jpeg"
    },
    "Coconut": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/2/2f/Coconut.png/revision/latest/scale-to-width-down/70?cb=20230404022348.jpeg"
    },
    "Stinger": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/b/b6/Stinger.png/revision/latest/scale-to-width-down/70?cb=20230404042929.jpeg"
    },
    "Honeysuckle": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/2/21/Honeysuckle.png/revision/latest/scale-to-width-down/70?cb=20230404031718.jpeg"
    },
    "Whirligig": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/5/5f/Whirligig.png/revision/latest/scale-to-width-down/70?cb=20230404031705.jpeg"
    },
    "Red Extract": {
      "recipe": { "Strawberry": 50, "Royal Jelly": 10 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/b/b9/Red_Extract.png/revision/latest/scale-to-width-down/70?cb=20230404020836.jpeg"
    },
    "Blue Extract": {
      "recipe": { "Blueberry": 50, "Royal Jelly": 10 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/d/df/Blue_Extract.png/revision/latest/scale-to-width-down/70?cb=20230129205708.jpeg"
    },
    "Glitter": {
      "recipe": { "Moon Charm": 25, "Magic Bean": 1 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/63/Glitter.png/revision/latest/scale-to-width-down/70?cb=20230404021017.jpeg"
    },
    "Glue": {
      "recipe": { "Gumdrops": 50, "Royal Jelly": 10 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/d/d4/Glue.png/revision/latest/scale-to-width-down/70?cb=20230404021042.jpeg"
    },
    "Oil": {
      "recipe": { "Sunflower Seed": 50, "Royal Jelly": 10 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/0/06/Oil.png/revision/latest/scale-to-width-down/70?cb=20230404021100.jpeg"
    },
    "Enzymes": {
      "recipe": { "Pineapple": 50, "Royal Jelly": 10 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/62/Enzymes.png/revision/latest/scale-to-width-down/70?cb=20230404021131.jpeg"
    },
    "Tropical Drink": {
      "recipe": { "Coconut": 10, "Enzymes": 2, "Oil": 2 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/0/0c/Tropical_Drink.png/revision/latest/scale-to-width-down/70?cb=20230404023952.jpeg"
    },
    "Purple Potion": {
      "recipe": { "Red Extract": 3, "Blue Extract": 3, "Neonberry": 3, "Glue": 3 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/9c/Purple_Potion.png/revision/latest/scale-to-width-down/70?cb=20230404023738.jpeg"
    },
    "Super Smoothie": {
      "recipe": { "Neonberry": 3, "Star Jelly": 3, "Purple Potion": 3, "Tropical Drink": 6 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/5/5f/Super_Smoothie.png/revision/latest/scale-to-width-down/70?cb=20230404023801.jpeg"
    },
    "Magic Bean": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/e/e9/Magic_Bean.png/revision/latest/scale-to-width-down/70?cb=20230404032456.jpeg"
    },
    "Spirit Petal": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/a/ab/Spirit_Petal.png/revision/latest/scale-to-width-down/70?cb=20230404045242.jpeg"
    },
    "Field Dice": {
      "recipe": { "Soft Wax": 1, "Whirligig": 1, "Red Extract": 1, "Blue Extract": 1 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/93/Field_Dice.png/revision/latest/scale-to-width-down/70?cb=20230404030928.jpeg"
    },
    "Smooth Dice": {
      "recipe": { "Field Dice": 3, "Soft Wax": 3, "Whirligig": 3, "Oil": 3 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/c/c6/Smooth_Dice.png/revision/latest/scale-to-width-down/70?cb=20230130020832.jpeg"
    },
    "Loaded Dice": {
      "recipe": { "Smooth Dice": 3, "Hard Wax": 3, "Oil": 3, "Glue": 1 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/0/0d/Loaded_Dice.png/revision/latest/scale-to-width-down/70?cb=20230130020656.jpeg"
    },
    "Sunflower Seed": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/66/Sunflower_Seed.png/revision/latest/scale-to-width-down/70?cb=20230404041336.jpeg"
    },
    "Strawberry": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/6d/Strawberry.png/revision/latest/scale-to-width-down/70?cb=20230404041355.jpeg"
    },
    "Pineapple": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/f/fb/Pineapple.png/revision/latest/scale-to-width-down/70?cb=20230404041445.jpeg"
    },
    "Bitterberry": {
    "recipe": "NoRecipe",
    "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/a/af/Bitterberry.png/revision/latest/scale-to-width-down/70?cb=20230404041641.jpeg"
    },
    "Blueberry": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/9e/Blueberry.png/revision/latest/scale-to-width-down/70?cb=20230404041412.jpeg"
    },
    "Neonberry": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/b/bb/Neonberry.png/revision/latest/scale-to-width-down/70?cb=20230404041653.jpeg"
    },
    "Moon Charm": {
      "recipe": { "Royal Jelly": 1, "Pineapple": 5, "Gumdrops": 5 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/b/b6/Moon_Charm.png/revision/latest/scale-to-width-down/70?cb=20230404041630.jpeg"
    },
    "Royal Jelly": {
      "recipe": "NoRecipe",
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/9f/Royal_Jelly.png/revision/latest/scale-to-width-down/70?cb=20230404020655.jpeg"
    },
    "Star Jelly": {
      "recipe": { "Royal Jelly": 100, "Glitter": 3 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/e/e7/Star_Jelly.png/revision/latest/scale-to-width-down/70?cb=20230404020706.jpeg"
    },
    "Soft Wax": {
      "recipe": { "Honeysuckle": 5, "Oil": 1, "Enzymes": 1, "Royal Jelly": 10 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/7/77/Soft_Wax.png/revision/latest/scale-to-width-down/70?cb=20230404042757.jpeg"
    },
    "Hard Wax": {
      "recipe": { "Soft Wax": 3, "Enzymes": 3, "Bitterberry": 33, "Royal Jelly": 33 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/d/d2/Hard_Wax.png/revision/latest/scale-to-width-down/70?cb=20230404042803.jpeg"
    },
    "Swirled Wax": {
      "recipe": { "Hard Wax": 3, "Soft Wax": 9, "Purple Potion": 6, "Royal Jelly": 3333 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/91/Swirled_Wax.png/revision/latest/scale-to-width-down/70?cb=20230404042825.jpeg"
    },
    "Caustic Wax": {
      "recipe": { "Hard Wax": 5, "Enzymes": 5, "Neonberry": 25, "Royal Jelly": 5252 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/b/bc/Caustic_Wax.png/revision/latest/scale-to-width-down/70?cb=20230404042819.jpeg"
    },
    "Turpentine": {
      "recipe": { "Super Smoothie": 10, "Caustic Wax": 10, "Star Jelly": 100, "Honeysuckle": 1000 },
      "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/e/e1/Turpentine.png/revision/latest/scale-to-width-down/70?cb=20230404042848.jpeg"
    },
    "Comforting Vial": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/3/39/Comforting_Vial.png/revision/latest/scale-to-width-down/70?cb=20230404042309.jpeg" },
    "Invigorating Vial": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/4/4e/Invigorating_Vial.png/revision/latest/scale-to-width-down/70?cb=20230404042317.jpeg" },
    "Refreshing Vial": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/65/Refreshing_Vial.png/revision/latest/scale-to-width-down/70?cb=20230406133057.jpeg" },
    "Satisfying Vial": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/8/84/Satisfying_Vial.png/revision/latest/scale-to-width-down/70?cb=20230404042358.jpeg" },
    "Motivating Vial": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/6f/Motivating_Vial.png/revision/latest/scale-to-width-down/70?cb=20230404042328.jpeg" },
    "Gold Egg": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/5/50/Gold_Egg.png/revision/latest/scale-to-width-down/70?cb=20230404043612.jpeg" },
    "Diamond Egg": { "recipe": "NoRecipe", "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/7/70/Diamond_Egg.png/revision/latest/scale-to-width-down/70?cb=20230404043735.jpeg" }
  },
  crafts: {
    "Tools": {
      "Petal Wand": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/d/d9/Petal_Wand.png/revision/latest/scale-to-width-down/70?cb=20210402171049.jpeg",
        "Honey": "1.5B", "Spirit Petal": 1, "Star Jelly": 10, "Glitter": 25, "Enzymes": 75
      },
      "Tide Popper": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/c/cc/Tide_Popper.png/revision/latest/scale-to-width-down/70?cb=20220103045407.jpeg",
        "Honey": "2.5T", "Blue Extract": 1500, "Stinger": 150, "Tropical Drink": 150, "Swirled Wax": 75, "Super Smoothie": 50, "Comforting Vial": 3
      },
      "Dark Scythe": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/6/6b/Dark_Scythe.png/revision/latest/scale-to-width-down/70?cb=20211226225244.jpeg",
        "Honey": "2.5T", "Red Extract": 1500, "Stinger": 150, "Hard Wax": 100, "Caustic Wax": 50, "Super Smoothie": 50, "Invigorating Vial": 3
      },
      "Gummyballer": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/c/c4/Gummyballer.png/revision/latest/scale-to-width-down/70?cb=20211227045658.jpeg",
        "Honey": "10T", "Glue": 1500, "Gumdrops": 2000, "Caustic Wax": 50, "Super Smoothie": 50, "Turpentine": 5, "Satisfying Vial": 3
      }
    },
    "Bags": {
      "Coconut Canister": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/9b/Coconut_Canister.png/revision/latest/scale-to-width-down/70?cb=20191006004936.jpeg",
        "Honey": "25B", "Tropical Drink": 150, "Coconut": 250, "Red Extract": 150, "Blue Extract": 150, "Refreshing Vial": 2
      }
    },
    "Masks": {
      "Gummy Mask": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/5/50/Gummy_Mask.png/revision/latest/scale-to-width-down/70?cb=20210919012419.jpeg",
        "Honey": "5B", "Glue": 250, "Enzymes": 100, "Oil": 100, "Glitter": 100, "Satisfying Vial": 1
      },
      "Diamond Mask": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/7/75/Diamond_Mask.png/revision/latest/scale-to-width-down/70?cb=20190403022722.jpeg",
        "Honey": "5B", "Blue Extract": 250, "Oil": 150, "Glitter": 100, "Diamond Egg": 5, "Comforting Vial": 1
      },
      "Demon Mask": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/96/Demon_Mask.png/revision/latest/scale-to-width-down/70?cb=20210919013026.jpeg",
        "Honey": "5B", "Red Extract": 250, "Stinger": 500, "Enzymes": 150, "Glue": 100, "Invigorating Vial": 1
      }
    },
    "Belts": {
      "Petal Belt": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/0/0d/Petal_Belt.png/revision/latest/scale-to-width-down/70?cb=20210402170808.jpeg",
        "Honey": "15B", "Star Jelly": 25, "Glitter": 50, "Glue": 100, "Spirit Petal": 1
      },
      "Coconut Belt": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/2/23/Coconut_Belt.png/revision/latest/scale-to-width-down/70?cb=20240525131914.jpeg",
        "Honey": "7.5T", "Coconut": 500, "Tropical Drink": 1500, "Purple Potion": 200, "Hard Wax": 200, "Turpentine": 3, "Refreshing Vial": 3
      }
    },
    "Boots": {
      "Coconut Clogs": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/4/43/Coconut_Clogs.png/revision/latest/scale-to-width-down/70?cb=20240127223737.jpeg",
        "Honey": "10B", "Coconut": 150, "Tropical Drink": 50, "Glue": 100, "Oil": 100, "Refreshing Vial": 1
      },
      "Gummy Boots": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/f/fb/Gummy_Boots.png/revision/latest/scale-to-width-down/70?cb=20181128213854.jpeg",
        "Honey": "100B", "Glue": 500, "Glitter": 250, "Red Extract": 250, "Blue Extract": 250, "Satisfying Vial": 1, "Motivating Vial": 1
      }
    },
    "Planters": {
      "Heat Treated Planter": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/f/fa/Heat-Treated_Planter.png/revision/latest/scale-to-width-down/70?cb=20230409002211.jpeg",
        "Honey": "750B", "Magic Bean": 75, "Red Extract": 750, "Hard Wax": 150, "Swirled Wax": 25, "Turpentine": 1
      },
      "Hydroponic Planter": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/0/08/Hydroponic_Planter.png/revision/latest/scale-to-width-down/70?cb=20230409002323.jpeg",
        "Honey": "750B", "Magic Bean": 75, "Blue Extract": 750, "Soft Wax": 500, "Caustic Wax": 25, "Turpentine": 1
      },
      "Petal Planter": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/9/98/Petal_Planter.png/revision/latest/scale-to-width-down/70?cb=20230407233644.jpeg",
        "Honey": "5T", "Magic Bean": 100, "Glitter": 100, "Soft Wax": 250, "Swirled Wax": 50, "Super Smoothie": 25
      },
      "The Planter-Of-Plenty": {
        "img": "https://static.wikia.nocookie.net/bee-swarm-simulator/images/0/0a/The_Planter_Of_Plenty.png/revision/latest/scale-to-width-down/70?cb=20230407233838.jpeg",
        "Honey": "100T", "Magic Bean": 500, "Super Smoothie": 100, "Swirled Wax": 100, "Caustic Wax": 100, "Turpentine": 25
      }
    }
  }
};