export const sets = [
    ['Infantry', [], [1, 2, 3], [1, 0, 1, 0, 0]],
    ['Trooper', [], [4, 5, 6], [2, 0, 1, 0, 0]],
    ['Sergeant', [], [7, 8, 9], [3, 0, 2, 0, 0]],
    ['General', [], [10, 11, 12], [4, 0, 2, 0, 0]],
    ['Mythical Sergey', [], [13, 14, 15], [5, 0, 3, 0, 0]],
    ['Godlike Sergey', [], [13, 14, 16], [6, -3, 0, 0, 0]],
    ['Apex Sergey', [3], [13, 14, 16, 17], [6, -4, 0, 0, 0]],
    ['Aave Hero', [], [18, 19, 20], [1, 0, 0, 1, 0]],
    ['Captain Aave', [], [21, 22, 23], [2, 0, 0, 1, 0]],
    ['Thaave', [], [24, 25, 26], [3, 2, 0, 0, 0]],
    ['Marc', [], [27, 28, 29], [4, 2, 0, 0, 0]],
    ['Jordan', [], [30, 31, 32], [5, 0, 0, 3, 0]],
    ['Godlike Stani', [], [33, 34, 35], [6, 0, -3, 0, 0]],
    ['Apex Stani', [2], [32, 33, 34, 35], [6, 1, -3, 0, 0]],
    ['ETH Maxi', [], [36, 37, 38], [1, 0, 0, 0, -1]],
    ['Foxy Meta', [], [39, 40, 41], [2, 0, -1, 0, 0]],
    ['Nogara the Eagle', [], [42, 43, 44], [3, 2, 0, 0, 0]],
    ['DeFi Degen', [], [45, 46, 47], [4, 0, 0, 0, -2]],
    ['DAO Summoner', [], [48, 49, 50, 51], [5, 0, 0, 0, 3]],
    ['Vitalik Visionary', [], [52, 53, 54], [6, -3, 0, 0, 0]],
    ['Apex Vitalik Visionary', [1], [51, 52, 53, 54], [7, -3, 0, 0, 1]],
    ['Super Aagent', [], [55, 56, 57, 58, 59], [4, -1, 0, 2, 0]],
    ['Aagent ', [], [55, 56, 57], [3, -1, 0, 1, 0]],
    ['Aagent ', [], [55, 56, 57, 58], [3, -1, 0, 2, 0]],
    ['Wizard ', [], [60, 64, 66], [1, 1, 0, 0, 0]],
    ['Wizard', [], [61, 64, 66], [1, 1, 0, 0, 0]],
    ['Wizard', [], [62, 64, 66], [1, 1, 0, 0, 0]],
    ['Wizard', [], [63, 64, 66], [1, 1, 0, 0, 0]],
    ['Wizard', [], [60, 65, 66], [1, 1, 0, 0, 0]],
    ['Legendary Wizard', [], [61, 65, 66], [4, 1, 0, 0, 1]],
    ['Mythical Wizard', [], [62, 65, 66], [5, 1, 0, 0, 2]],
    ['Godlike Wizard', [], [63, 65, 66], [6, 1, 0, 0, 2]],
    ['Farmer', [], [67, 68, 69], [1, -1, 0, 0, 0]],
    ['Mythical Farmer', [], [67, 68, 70], [5, -2, 0, 0, -1]],
    ['OKex Jaay', [], [72, 73, 74], [5, -1, 0, 0, -2]],
    ['OKex Jaay Hao', [], [72, 73, 74, 75], [5, -1, 0, 0, -2]],
    ['Skater', [], [77, 78, 79], [2, 0, 0, 0, -1]],
    ['Sushi Chef', [], [80, 81, 82], [4, 0, 2, 0, 0]],
    ['Sushi Chef', [], [80, 81, 83], [3, 0, 2, 0, 0]],
    ['Master Sushi Chef', [], [80, 81, 82, 83], [4, 0, 2, -1, 0]],
    ['Gentleman', [], [84, 85, 86], [4, 0, -2, 0, 0]],
    ['Miner', [], [87, 88, 89], [2, 1, 0, 0, 0]],
    ['Pajamas', [], [90, 91, 92], [3, 0, 0, -2, 0]],
    ['Pajamas', [], [90, 91, 93], [3, 0, 0, -2, 0]],
    ['Full Pajamas', [], [90, 91, 92, 93], [4, 0, 0, -3, 0]],
    ['Runner', [], [94, 95, 96], [2, 1, 0, 0, 0]],
    ['Runner', [], [94, 95, 121], [2, 1, 0, 0, 0]],
    ['Runner', [], [94, 125, 96], [2, 1, 0, 0, 0]],
    ['Long Distance Runner', [], [94, 125, 121], [4, 2, 0, 0, 0]],
    ['Lady', [], [97, 98, 100], [4, 0, 0, -2, 0]],
    ['Lady', [], [97, 98, 99], [4, 0, 0, -2, 0]],
    ['Socialite', [], [97, 98, 99, 100], [5, 2, 0, -1, 0]],
    ['Witchy', [], [101, 102, 103], [5, 0, 0, 3, 0]],
    ['Portal Mage', [], [104, 105, 106], [4, 0, 2, 0, 0]],
    ['Supreme Portal Mage', [], [104, 105, 107], [6, 0, 3, 0, 0]],
    ['Rastafarian', [], [108, 109, 110], [3, 0, -2, 0, 0]],
    ['Off Duty Hazmat', [], [111, 112, 123], [4, 2, 0, 0, 0]],
    ['On Duty Hazmat', [], [111, 112, 113], [6, 3, 0, 0, 0]],
    ['Blue Vacationer', [], [115, 116, 117], [4, -2, 0, 0, 0]],
    ['Red Vacationer', [], [114, 116, 117], [5, -2, 0, -1, 0]],
    ['Crypto OG', [], [12, 19, 36, 40, 77], [4, 0, 0, 0, -2]],
    ['Rektboi', [], [29, 45, 46], [4, 0, 0, 0, -2]],
    ['Man of Culture', [], [47, 59, 74], [4, 0, 0, 0, -2]],
    ['Curve Surfer', [], [66, 76, 115], [4, 0, 0, 0, 2]],
    ['PoW Miner', [], [25, 77, 89], [3, 0, 2, 0, 0]],
    ['Toddler', [], [90, 91, 119], [4, 0, -2, 0, 0]],
    ['FU Money', [], [35, 114, 117, 120], [6, 0, -3, 0, 0]],
    ['Farmer Alf', [], [13, 67, 68, 69], [5, -3, 0, 0, 0]],
    ['Battle Santa', [], [5, 13, 71, 106], [5, 0, 3, 0, 0]],
    ['Party Animal', [], [109, 40, 124], [5, 0, 0, 0, -3]],
    ['Snapshot Voter', [], [137, 138, 139], [3, 0, -2, 0, 0]],
    ['Polygonist', [], [134, 135, 136], [3, 0, -1, 0, 1]],
    ['Quickswap Dragon', [], [130, 131, 132], [3, 0, 1, 1, 0]],
    ['Swappy the Dragon', [], [130, 132, 133], [4, 0, 1, 1, 0]],
    ['Gotchi Elf', [], [140, 141, 142], [3, 0, 0, -1, 1]],
    ['Gotchi Princess', [], [140, 141, 142, 143], [4, 1, 1, 0, 0]],
    ['Gotchi Queen', [], [140, 141, 144, 143], [5, 0, 0, -2, 1]],
    ['Godli Locks', [], [140, 141, 145, 143], [6, 0, 0, -2, 2]],
    ['Gotchi Baron', [], [146, 147, 148], [3, -1, 0, 0, -1]],
    ['Gotchi Lord', [], [146, 147, 148, 150], [5, -1, 0, 0, -2]],
    ['Gotchi King', [], [146, 149, 148, 150], [5, -2, 0, 0, -1]],
    ['Gotchi Emperor', [], [146, 149, 148, 150, 156], [6, -2, 0, 0, -2]],
    ['Lil Pumpagotchi', [], [157, 158, 159, 160, 161], [6, 2, 2, 0, 0]],
    ['Soundcloud Rapper', [], [108, 157, 158, 159, 160], [5, 1, 2, 0, 0]],
    ['REALM Tycoon', [], [84, 85, 86, 146], [4, -1, -1, 0, 0]],
    ['Yegres the Dragon', [], [14, 131, 132, 44], [5, 0, 0, 1, 2]],
    ['Vacation Santa', [], [71, 114, 120, 117], [5, -1, -1, -1, 0]],
    ['VR Gamer', [], [202, 203, 204], [5, 2, 1, 0, 0]],
    ['Steampunk', [], [199, 200, 201], [4, 0, 0, 2, 0]],
    ['Casual Gamer', [], [117, 203, 204], [3, 1, 1, 0, 0]],
    ['Gentleman Farmer', [], [69, 146, 200], [2, 0, 0, 1, 0]],
    ['Cyberpunk', [], [43, 48, 202], [5, 3, 0, 0, 0]],
    ['Steampunk Grenadier', [], [1, 2, 6, 199], [3, 0, 0, 2, 0]], 
    ['Venly Biker', [], [206, 207, 208, 209], [4, 1, 1, 0, 0]],
    ['Hacker Aanon', [], [211, 212, 213], [5, -2, 0, 0, 1]],
    ['Shadowy Supercoder', [], [212, 213, 214], [6, -2, 0, 0, 1]],
    ['Cyborg ', [], [215, 216, 217], [5, 0, 3, 0, 0]],
    ['Punk Rocker', [], [218, 219, 220], [4, 0, 2, 0, 0]],
    ['Piraate', [], [221, 222, 223, 224], [3, 0, 0, 0, -2]],
    ['Aair Gotchi', [], [225, 226, 227], [3, 2, 0, 0, 0]],
    ['Wraangler', [], [228, 229, 230], [2, 0, 1, 0, 0]],
    ['Ranchero', [], [231, 232, 233], [2, -1, 0, 0, 0]],
    ['Ranchero', [], [231, 232, 236], [2, -1, 0, 0, 0]],
    ['Ranchero', [], [231, 232, 237], [2, -1, 0, 0, 0]],
    ['Ranchero', [], [231, 232, 238], [2, -1, 0, 0, 0]],
    ['Novice Shaaman', [], [233, 234, 235], [5, -3, 0, 0, 0]],
    ['Shaaman Priest', [], [234, 235, 236], [5, -3, 0, 0, 0]],
    ['Shaaman Mystic', [], [234, 235, 237], [5, -3, 0, 0, 0]],
    ['Master Shaaman', [], [234, 235, 238], [6, -3, 0, 0, 0]],
    ['WGMI Wagie ', [], [239, 240, 241], [3, 0, -2, 0, 0]],
    ['YOLO Guy', [], [242, 243, 244], [4, -1, -1, 0, 0]],
    ['Psychonaut', [], [234, 235, 238, 53], [7, -3, 0, 0, 1]],
    ['Tech Bro', [], [242, 243, 244, 212], [5, -2, 0, 0, 1]],
    ['Gunslinger', [], [231, 228, 58, 58], [3, 0, 2, 0, 0]],
    ['We Are Legion', [], [85, 211, 212], [5, 0, 0, 3, 0]],
    ['Aastronaut', [], [252, 253, 254], [1, 0, 0, 1, 0]],
    ['Geckogotchi', [], [249, 250, 251], [2, 1, 0, 0, 0]],
    ['Super Geckogotchi', [], [245, 249, 250, 251], [3, 0, 0, -1, -1]],
    ['Lil Bubble', [], [255, 256, 257], [4, 2, -1, 0, 0]],
    ['Radar', [], [261, 262, 263], [5, 0, -1, 0, 2]],
    ['Laozigotchi', [], [258, 259, 260], [6, -2, 0, 0, 1]],
    ['Wandering Sage', [], [65, 258, 259, 260], [7, -2, 0, 0, 2]],
    ['APY Visionary', [], [246, 247, 248], [2, 1, 0, 0, 0]]
];