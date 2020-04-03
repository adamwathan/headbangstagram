const artists = [
  {
    id: 1,
    name: 'Death',
    image_url: '/img/death.jpeg',
  },
  {
    id: 2,
    name: 'Malevolent Creation',
    image_url: '/img/malevolent-creation.jpeg',
  },
  {
    id: 3,
    name: 'Entombed',
    image_url: '/img/entombed.jpeg',
  },
  {
    id: 4,
    name: 'Gorguts',
    image_url: '/img/gorguts.jpeg',
  },
  {
    id: 5,
    name: 'Pestilence',
    image_url: '/img/pestilence.jpeg',
  },
  {
    id: 6,
    name: 'Suffocation',
    image_url: '/img/suffocation.jpeg',
  },
  {
    id: 7,
    name: 'Edge of Sanity',
    image_url: '/img/edge-of-sanity.jpeg',
  },
  {
    id: 8,
    name: 'Carcass',
    image_url: '/img/carcass.jpeg',
  },
  {
    id: 9,
    name: 'Cryptopsy',
    image_url: '/img/cryptopsy.jpeg',
  },
]

export default async (req, res) => {
  return res.json(artists)
}
