import React from 'react';
import NavBar from '../components/NavBar';
import MovieContent from '../components/MovieContent';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className='min-h-screen text-white bg-neutral-900'> {/* Added bg for consistancy */}
            <NavBar />
            <main>
                <MovieContent />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
