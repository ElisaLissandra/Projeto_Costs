import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from '../layout/Message';
import Container from '../layout/Container';
import Loading   from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';

import styles from './Projects.module.css'



function Projects() {

    // Armazena as informações dos projetos
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false) 
    const [projectMessage, setProjectMessage] = useState('');

    // Mensagem
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    // Recupera as informações dos projetos
    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
            .then(data => {
                //console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
    }, [])


    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category ? project.category.name : 'Sem categoria'}
                            key={project.id}
                            handleRemove={removeProject}
                            project={project} 
                        />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>

    )
}

export default Projects