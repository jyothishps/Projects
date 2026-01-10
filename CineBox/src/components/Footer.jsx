import React from 'react'

function Footer() {
  return <footer className='bg-neutral-900 text-neutral-400 border-t border-neutral-800'>
    <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div>
                <a href="/" className='inline-block mb-6'>
                <span className='text-purple-500 font-bold text-2xl'>
                    Cine<span className='text-white'>Box</span>
                </span>
            </a>
            <p className='mb-4 text-sm'>
                Discover and explore the latest movies from around the world.
                CineBox gives you access to a vast collection of films across all genres. 
            </p>
            <div className='flex space-x-4'>
            </div>
            </div>

            <div>
                <h3 className='text-white font-semibold text-lg mb-4'>Quick Links</h3>
                <ul className='space-y-2 text-sm'>
                    <li>
                        <a href="#" className='hover:text-purple-400 transition-all'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#trending" className='hover:text-purple-400 transition-all'>
                            Trending
                        </a>
                    </li>
                    <li>
                        <a href="#popular" className='hover:text-purple-400 transition-all'>
                            Popular
                        </a>
                    </li>
                    <li>
                        <a href="#top-rated" className='hover:text-purple-400 transition-all'>
                            Top Rated
                        </a>
                    </li>
                    <li>
                        <a href="#genre" className='hover:text-purple-400 transition-all'>
                            Browse by Genres
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className='text-white font-semibold text-lg mb-4'>Resources</h3>
                <ul className='space-y-2 text-sm'>
                    <li><a href="#" className='hover:text-purple-400'>About</a></li>
                    <li><a href="#" className='hover:text-purple-400'>Contact</a></li>
                    <li><a href="#" className='hover:text-purple-400'>Blog</a></li>
                    <li><a href="#" className='hover:text-purple-400'>FAQ</a></li>
                    <li><a href="#" className='hover:text-purple-400'>Help Center</a></li>
                </ul>
            </div>

            <div>
                <h3 className='text-white font-semibold text-lg mb-4'>Newsletter</h3>
                <p className='text-sm mb-4'>Stay up to date with latest movies and news</p>
                <form className='space-y-3'>
                    <div className='relative'>
                        <input type="email" placeholder='Your email address'
                        className='w-full bg-neutral-800 border-neutral-700 text-white
                        px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50
                        text-sm'/>
                    </div>
                    <button className='w-full bg-purple-600 hover:bg-purple-700 text-white
                    py-2 rounded-lg transition-all text-sm'>
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    </div>
  </footer>
}

export default Footer