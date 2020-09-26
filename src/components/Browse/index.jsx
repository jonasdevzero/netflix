import React, { useContext, useState, useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import Profiles from '../Profiles'
import Loading from '../Loading'
import Header from '../Header'

import * as ROUTES from '../../constants/routes'
import { FirebaseContext } from '../../context/firebase'

function BrowseComponent({ children, slides }) {
    const { firebase } = useContext(FirebaseContext)
    const user = firebase.auth().currentUser || {}

    const [search, setSearch] = useState('')
    const [searchActive, setSearchActive] = useState(false)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({})
    const [category, setCategory] = useState('series')
    const [slideRows, setSlideRows] = useState([])

    useEffect(_ => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [profile.displayName])

    useEffect(_ => {
        setSlideRows(slides[category])
    }, [slides, category])

    return profile.displayName ?
        <>
            {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
            <Header src="joker1" bg={false} browser={true}>
                <Header.Container>
                    <Header.Group>
                        <ReactRouterLink to={ROUTES.HOME}>
                            <Header.Logo src="/images/misc/logo.svg" alt="Netflix" />
                        </ReactRouterLink>
                        <Header.Link active={category === 'series' ? 'true' : 'false'} onClick={_ => setCategory('series')}>Series</Header.Link>
                        <Header.Link active={category === 'films' ? 'true' : 'false'} onClick={_ => setCategory('films')}>Films</Header.Link>
                    </Header.Group>
                    <Header.Group>
                        <Header.Search>
                            <Header.SearchIcon onClick={_ => setSearchActive(!searchActive)}>
                                <img src="/images/icons/search.png" alt="Search" />
                            </Header.SearchIcon>
                            <Header.SearchInput value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" active={searchActive} />
                        </Header.Search>
                        <Header.Profile>
                            <Header.Picture src={user.photoURL} />
                            <Header.Dropdown>
                                <Header.Group>
                                    <Header.Picture src={user.photoURL} />
                                    <Header.Link>{user.displayName}</Header.Link>
                                </Header.Group>
                                <Header.Group>
                                    <Header.Link onClick={_ => firebase.auth().signOut()}>Sing out</Header.Link>
                                </Header.Group>
                            </Header.Dropdown>
                        </Header.Profile>
                    </Header.Group>
                    {children}
                </Header.Container>
                <Header.FilmFeature>
                    <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
                    <Header.Text>
                        Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham
                        City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a
                        futile attempt to feel like he's part of the world around him.
                            </Header.Text>
                    <Header.PlayButton>Play</Header.PlayButton>
                </Header.FilmFeature>
            </Header>
        </>
        :
        <Profiles user={user} setProfile={setProfile} />
}

export default BrowseComponent