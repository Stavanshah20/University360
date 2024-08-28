import React, { useEffect, useState } from 'react'
// import { Badge, Button, Card } from 'react-bootstrap'
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
// import notes from '../../data/notes'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './MyNotes.css';

const MyNotes = ({ search }) => {

    const dispatch = useDispatch();

    const noteList = useSelector(state => state.noteList);
    const { loading, notes, error } = noteList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector(state => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;
    // const [notes, setNotes] = useState([]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you Sure?")) {
            dispatch(deleteNoteAction(id));
        }
    };

    // const fetchNotes = async () => {
    //     const { data } = await axios.get('http://localhost:5000/api/notes');
    //     setNotes(data);
    // }

    const history = useHistory();

    const [activeTab, setActiveTab] = useState('Students');

    const handleTabClick = (tabName) => {
        console.log(tabName);
        setActiveTab(tabName);
    };

    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
            history.push("/");
        }
    }, [dispatch, successCreate, history, userInfo, successUpdate, successDelete]);

    return (
        <div>
            <MainScreen title={`Welcome back ${userInfo.name}...`}>
                <Link to="/createnote">
                    <Button style={{ margin: 10, marginBottom: 10 }} size="lg">
                        Create New Note
                    </Button>
                </Link>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {errorDelete && (
                    <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                )}
                {loading && <Loading />}
                {loadingDelete && <Loading />}

                <div className='flexdiv'>
                    <nav className="navbar">
                        <ul className="navbar-nav">
                            <Button className={`nav-item ${activeTab === 'Students' ? 'active' : ''}`} onClick={() => handleTabClick('Students')}>
                                Students
                            </Button>
                            <Button className={`nav-item ${activeTab === 'Faculty' ? 'active' : ''}`} onClick={() => handleTabClick('Faculty')}>
                                Faculty
                            </Button>
                            <Button className={`nav-item ${activeTab === 'Achievements' ? 'active' : ''}`} onClick={() => handleTabClick('Achievements')}>
                                Achievements
                            </Button>
                            <Button className={`nav-item ${activeTab === 'General' ? 'active' : ''}`} onClick={() => handleTabClick('General')}>
                                General
                            </Button>
                        </ul>
                    </nav>

                    <div className='mainContent'>
                        {
                            notes?.filter(
                                filteredNote => (filteredNote.title.toLowerCase().includes(search.toLowerCase()) &&
                                    (activeTab === 'General' || filteredNote.category === activeTab))
                            ).reverse().map(note => {
                                return <Accordion key={note._id}>
                                    <Accordion.Item eventkey="0">
                                        <Card style={{ margin: 10 }}>
                                            <Card.Header style={{ display: 'flex' }}>

                                                <span style={{
                                                    color: 'black',
                                                    textDecoration: 'none',
                                                    flex: 1,
                                                    cursor: 'pointer',
                                                    // alignSelf: 'center',
                                                    fontSize: 8,
                                                }}>


                                                    <Accordion.Header>
                                                        {note.title}
                                                    </Accordion.Header>

                                                </span>
                                                {(note.user === userInfo._id) ?
                                                    <div>
                                                        <Button href={`/note/${note._id}`}>Edit</Button>
                                                        <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                                                    </div>
                                                    : <div></div>
                                                }
                                            </Card.Header>
                                            {/* <Accordion.Collapse eventKey='0'> */}
                                            <Accordion.Body>
                                                <Card.Body>
                                                    <h4>
                                                        <Badge bg="success">
                                                            Category - {note.category}
                                                        </Badge>
                                                    </h4>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>
                                                            <td dangerouslySetInnerHTML={{ __html: note.content }} />
                                                        </p>
                                                        <footer className="blockquote-footer">
                                                            Created On - date {note.createdAt.substring(0, 10)}
                                                        </footer>
                                                    </blockquote>
                                                </Card.Body>
                                            </Accordion.Body>

                                            {/* </Accordion.Collapse> */}

                                        </Card>
                                    </Accordion.Item>
                                </Accordion>
                            })
                            // <Card key={note._id}>
                            //     <Card.Header style={{ display: "flex" }}>
                            //         <Link to={`/note/${note._id}`} style={{
                            //             flex: 1,
                            //             cursor: "pointer",
                            //             alignSelf: "center",
                            //         }}>
                            //             <span
                            //                 style={{
                            //                     color: "black",
                            //                     textDecoration: "none",
                            //                     flex: 1,
                            //                     cursor: "pointer",
                            //                     alignSelf: "center",
                            //                     fontSize: 20,
                            //                 }}
                            //             >{note.title}</span></Link>
                            //         <div>
                            //             <Button href={`/note/${note._id}`}>Edit</Button>
                            //             <Button variant='danger' className='mx-2'
                            //                 onClick={() => deleteHandler(note._id)}
                            //             >Delete</Button>
                            //         </div>
                            //     </Card.Header>
                            //     <Card.Body>
                            //         <Badge bg='info'>{note.category}</Badge>
                            //         <Card.Title>{note.title}</Card.Title>
                            //         <Card.Text>
                            //             <td dangerouslySetInnerHTML={{ __html: note.content }} />
                            //             {/* {note.content}  */}
                            //             <br></br>
                            //             {note.createdAt.substring(0, 10)}
                            //         </Card.Text>
                            //     </Card.Body>
                            // </Card>


                        }
                    </div>
                </div>


            </MainScreen>
        </div >
    )
}

export default MyNotes
