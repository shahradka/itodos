import React, { ReactNode } from 'react'
import Head from 'next/head';
import AppBar from '@mui/material/AppBar'

import Container from '@mui/material/Container'

type Props = {
    children?: ReactNode
    title?: string
    pageTitle?: string
    Toolbar?: ReactNode
}

const Layout = ({ pageTitle = 'This is the default title', title, children, Toolbar }: Props) => {

    return (
        <>
            <Head>
                {pageTitle}
            </Head>
            <Container maxWidth="md">

                <header>
                    <nav className='text-3xl font-bold underlin'>
                        <AppBar position="static" color="primary">
                            {Toolbar}
                        </AppBar>
                    </nav>
                </header>
                <main>
                    <h1 className='p-4 text-lg'>{title}</h1>
                    {children}
                </main>
            </Container>
        </>
    )
}

export default Layout;