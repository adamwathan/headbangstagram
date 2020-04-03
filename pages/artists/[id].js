import Layout from '~/components/Layout'
import Link from 'next/link'
import Router from 'next/router'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

function Modal({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-25" onClick={() => Router.back()}></div>
      <div className="relative w-full max-w-2xl bg-white p-8">{children}</div>
    </div>
  )
}

function AlbumModal({ artist, album }) {
  return (
    <Modal>
      <div className="flex -mx-4">
        <div className="w-1/2 px-4">
          <div className="text-2xl font-bold leading-none">{album.title}</div>
          <div className="mt-2 text-sm font-bold leading-none uppercase tracking-wide text-gray-600">
            by <span className="text-gray-700">{artist.name}</span>
          </div>
          <ol className="mt-4 list-decimal text-sm text-gray-800 pl-4">
            {album.tracks.map(track => (
              <li>
                <div className="flex justify-between">
                  {track.title} <span className="text-gray-600">{track.length}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="w-1/2 px-4">
          <img src={`/static${album.artwork_url}`} alt={`${artist.name} - ${album.title}`} />
        </div>
      </div>
    </Modal>
  )
}

const Index = withRouter(({ router, artist, albums }) => {
  return (
    <Layout>
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{artist.name}</h1>
            <p className="mt-2 text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum vel eveniet molestiae
              aliquam nihil commodi accusamus doloremque quam quo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {albums.map(album => (
              <div key={albums.id} class="relative pb-full">
                <Link
                  href={{
                    pathname: '/artists/[id]',
                    query: { id: artist.id, showAlbum: album.id },
                  }}
                  as={`/albums/${encodeURIComponent(album.id)}`}
                  scroll={false}
                  shallow
                >
                  <a className="group block absolute inset-0">
                    <img
                      className="h-full w-full object-cover"
                      src={`/static${album.artwork_url}`}
                      alt={album.title}
                    />
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-black opacity-50"></div>
                      <div className="relative text-white font-semibold text-lg">{album.title}</div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {router.query.showAlbum && (
        <AlbumModal
          artist={artist}
          album={albums.find(album => album.id == router.query.showAlbum)}
        />
      )}
    </Layout>
  )
})

Index.getInitialProps = async ({ req, query }) => {
  function getBaseUrl(req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    return `${protocol}://${host}/api`
  }

  const baseUrl = req ? getBaseUrl(req) : '/api'
  const artists = await fetch(`${baseUrl}/artists`).then(r => r.json())
  const albums = await fetch(`${baseUrl}/albums`).then(r => r.json())

  return {
    artist: artists.find(artist => artist.id == query.id),
    albums: albums.filter(album => album.artist_id == query.id),
  }
}

export default Index
