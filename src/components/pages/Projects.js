import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from '../layout/Message';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';

import styles from './Projects.module.css'




function Projects() {

    // Armazena as informações dos projetos
    const [projects, setProjects] = useState([])

    // Mensagem
    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    // Recupera as informações dos projetos
    useEffect (() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            setProjects(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />} 
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) => <ProjectCard name={project.name} />)}
            </Container>
        </div>
    )
}

export default Projects