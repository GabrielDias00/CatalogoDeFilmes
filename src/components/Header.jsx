import React from "react"
import { Container, Navbar } from "react-bootstrap"

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/" style={{ fontSize: '1.8rem', fontWeight:'bold'}}>
                    Rebobinando
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}