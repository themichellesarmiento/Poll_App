import { PollData } from "@/types/poll"

export const pollQuestions: PollData[] = [
  {
    "id": "1",
    "question": "Who is the strongest Avenger?",
    "options": [
      { "id": "option-1", "name": "Scarlet Witch", "image": "scarlet_witch.png", "votes": 42 },
      { "id": "option-2", "name": "Thor", "image": "thor.png", "votes": 51 },
      { "id": "option-3", "name": "Captain Marvel", "image": "captain_marvel.png", "votes": 37 }
    ]
  },
   {
    "id": "2",
    "question": "Best Spider Man actor?",
    "options": [
      { "id": "option-4", "name": "Tobey Maguire", "image": "tobey_maguire.png", "votes": 55 },
      { "id": "option-5", "name": "Andrew Garfield", "image": "andrew_garfield.png", "votes": 40 },
      { "id": "option-6", "name": "Tom Holland", "image": "tom_holland.png", "votes": 55 }
    ]
  },
  {
    "id": "3",
    "question": "Best villain?",
    "options": [
      { "id": "option-7", "name": "Ultron", "image": "ultron.png", "votes": 29 },
      { "id": "option-8", "name": "Thanos", "image": "thanos.png", "votes": 88 },
      { "id": "option-9", "name": "Loki", "image": "loki.png", "votes": 64 }
    ]
  },
]