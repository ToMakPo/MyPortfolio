import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import NavLink from '../components/NavLink'
import MenuIcon from '../components/MenuIcon'
import CloseIcon from '../components/CloseIcon'
import API from '../utils/API'

import Certifications from "../layouts/Certifications"
import Education from '../layouts/Education'
import Projects from '../layouts/Projects'
import References from '../layouts/References'
import Skills from '../layouts/Skills'
import WorkHistory from '../layouts/WorkHistory'

import '../styles/Admin.css'

function Admin() {
    const [modal, setModal] = useState('')
    const [showMenu, setShowMenu] = useState(false)
	const { search } = useLocation()
    const queries = new URLSearchParams(search)
    const hasAccess = useRef(false)
    const page = queries.get('page')

    const links = [<NavLink
        key='home'
        value='Home'
        to='/'
    />]
    const sections = {}

    const navMenu = useRef()

    {([
        {value: 'Work History', Element: WorkHistory},
        {value: 'Education', Element: Education},
        {value: 'Projects', Element: Projects},
        {value: 'Skills', Element: Skills},
        {value: 'Certifications', Element: Certifications},
        {value: 'References', Element: References}
    ]).forEach(({value, Element}) => {
        const name = value.replace(' ', '')
        const page = name.toLowerCase()
        const url = 'admin?page=' + page
        links.push(<NavLink
            key={page}
            value={value}
            to={url}
        />)
        sections[page] = <Element 
            setModal={setModal}
        />
    })}

    useEffect(async _ => {
        /// Check that the user has the correct admin key. 
        let key = queries.get('key')
        if (key === undefined) {
            localStorage.getItem('admin_key')
        } else {
            localStorage.setItem('admin_key', key)
        }
        hasAccess.current = key !== null && await API.checkAdminKey(key)
    }, [])

    return (
        <section id='admin-page'>
            {hasAccess ? <>
                <header>
                    <h1>Admin Page</h1>
                    <MenuIcon onClick={_ => setShowMenu(true)}/>
                    <nav 
                        className={showMenu ? 'show' : ''}
                        ref={navMenu} 
                        onClick={_ => setShowMenu(false)}
                    >
                        <CloseIcon onClick={_ => setShowMenu(false)}/>
                        {links}
                    </nav>
                </header>

                {sections[page]}
                {modal}
            </> : <>
                <div>You do not have permission to use this page.</div>
                <div><Link to='/'>Click here</Link> to get back to home page.</div>
            </>}
        </section>
    )
}

export default Admin