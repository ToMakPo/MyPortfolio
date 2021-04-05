import NavLink from '../components/NavLink';

function Home() {
    return (
        <section id='home-page'>
            <h1>Makai Post</h1>
            <sup>Software Developer</sup>
            <nav>
                <NavLink value='Admin' to='/admin'/>
            </nav>
        </section>
    )
}

export default Home