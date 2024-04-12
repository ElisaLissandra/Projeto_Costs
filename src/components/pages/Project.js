import styles from './Project.module.css'

import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message  from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

function Project() {

    const { id } = useParams()
    console.log(id)

    // Exibe as informações dos projetos
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log())
    }, [id])


    // Edita as informações dos projetos
    function editPost(project) {
        //budget validation
        //console.log(project)

        if(project.budget < project.cost)  {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),  
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)  
            setMessage('Projeto Atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    // Exibe o formulário de edição
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (<>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span>  R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span>  R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm
                                    handleSubmit={editPost} 
                                    btnText="Concluir edição"
                                    projectData= {project}
                                />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default Project