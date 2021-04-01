// import { useState, useRef } from 'react'
// import { useLocation, Link } from 'react-router-dom'
// import TextareaAutosize from 'react-textarea-autosize';
// import { TiEdit as EditIcon } from "react-icons/ti"
// import { IoIosAddCircle as AddIcon, IoIosClose as CloseIcon } from "react-icons/io"
import editJsonFile from 'edit-json-file';

// import Moment from 'react-moment'

// import NavLink from '../components/NavLink'


// import xxx from './xxx.json'
// console.log(xxx.map(x => {return {...x}}));
// xxx[0].path = ['happy']
// console.log(xxx.map(x => {return {...x}}));

// import workHistory from './workHistory.json'
// import education from './education.json'
// const path = '' + './xxx.json'
// import xxx from path
// console.log({xxx});

// import '../styles/Admin.css';



// const fs = require('fs')
// fs.writeFileSync(path, {note: 'FROM FILE'})

function Admin() {
    let file = editJsonFile(`${__dirname}/info.json`);
    console.log(file);
    console.log(file.get());
//     const [modal, setModal] = useState('')
// 	const { search } = useLocation()
//     const queries = new URLSearchParams(search)
//     let key = queries.get('key') || localStorage.getItem('admin_key')
//     localStorage.setItem('admin_key', key)
//     const hasAccess = key === process.env.REACT_APP_ADMIN_KEY
//     const page = queries.get('page')

//     const section = {
//         workhistory: <WorkHistory/>,
//         education: <Education/>,
//     }

//     function addLink(value) {
//         const page = value.toLowerCase().replace(/\W/g, '')
//         const url = 'admin?page=' + page
//         return <NavLink value={value} to={url}/>
//     }

//     const homeLink = <NavLink value='Home' to='/'/>

    return (
        <section id='admin-page'>
            hello
            {/* {hasAccess ? <>
                <header>
                    <h1>Admin Page</h1>
                    <nav>
                        {homeLink}
                        {addLink('Work History')}
                        {addLink('Education')}
                    </nav>
                </header>

                {section[page]}
                {modal}
            </> : <>
                <div>You do not have permission to use this page.</div>
                <div><Link to='/'>Click here</Link> to get back to home page.</div>
            </>} */}
        </section>
    )

//     function WorkHistory() {
//         return (
//             <section id='work-history-section'>
//                 <div className='section-header'>
//                     <h2>Work History</h2>
//                     <AddIcon 
//                         className='add-button'
//                         size='25'
//                         color='#91aa3f'
//                         onClick={_ => setModal(<Modal/>)}
//                     />
//                 </div>
//                 <div className='items'>
//                     {workHistory.map(data => <Item key={data.id} {...data}/>)}
//                 </div>
//             </section>
//         )

//         function Item(data) {
//             const {title, company, type, startDate, endDate, location, description, imagePath} = data
//             return (
//                 <div className='item'>
//                     <img src={imagePath} alt={`${company} company logo`}/>
//                     <div>
//                         <h3>{title}</h3>
//                         <div><span>{company}</span> • <span>{type}</span></div>
//                         <div>
//                             <Moment format={"MMM YYYY"} date={startDate}/>{' - '}
//                             {endDate ? <Moment format={"MMM YYYY"} date={endDate}/> : 'Present'}
//                         </div>
//                         <div>{location}</div>
//                         <div>{
//                             description?.map((line, i) => {
//                                 if (Array.isArray(line)) {
//                                     return <ul key={i} >{line.map((item, j) => <li key={j}>{item}</li>)}</ul>
//                                 } else {
//                                     return <p key={i}>{line}</p>
//                                 }
//                             }
//                         )}</div>
//                     </div>
//                     <EditIcon 
//                         className='edit-button'
//                         size='30'
//                         onClick={_ => setModal(<Modal body={data}/>)}
//                     />
//                 </div>
//             )
//         }

//         function Modal({body}) {
//             const [isNew] = useState(body === undefined)
//             const [data, setData] = useState(body ? {...body} : {
//                 id: Math.floor(Math.random() * 36**10).toString(36).toUpperCase().padStart(10, '0'), 
//                 title: '', 
//                 company: '', 
//                 type: '', 
//                 startDate: '', 
//                 endDate: '', 
//                 location: '', 
//                 description: [], 
//                 imagePath: ''
//             })
//             const [currentlyInRole, setCurrentlyInRole] = useState(isNew ? false : data.endDate === '')
            
//             const refs = {}

//             function stringifyDescription() {
//                 return data.description
//                     .map(line => {
//                         if (Array.isArray(line)) {
//                             line = line.map(li => ' - ' + li).join('\n\n')
//                         }
//                         return line
//                     }).join('\n\n')
//             }

//             function parseDescription(description) {
//                 const oldDescription = description.split('\n')
//                 const newDescription = []
//                 const list = []

//                 while (oldDescription.length > 0) {
//                     const line = oldDescription.shift().trim()
//                     if (line === '') continue

//                     const split = line.split(/^\W*-\W*/)
//                     if (split.length == 2) {
//                         if (split[1] !== '') {
//                             list.push(split[1])
//                         }
//                         continue
//                     }

//                     if (list.length > 0) {
//                         newDescription.push([...list])
//                         list.length = 0
//                     }

//                     newDescription.push(line)
//                 }

//                 if (list.length > 0) {
//                     newDescription.push([...list])
//                     list.length = 0
//                 }

//                 return newDescription
//             }

//             function editData(key, value) {
//                 setData({...data, [key]: value})
//             }

//             const Input = ({name, id, type, label, value, onInput, ...props}) => {
//                 const key = (name[0].toLowerCase() + name.substr(1)).replace(/\W/g, '')
//                 id = id || name.toLowerCase().replace(/\W/g, '-') + '-input'
//                 refs[key + 'Input'] = useRef()
//                 return (
//                     <div className='modal-input modal-form-item'>
//                         <label htmlFor={id}>{label || name}</label>

//                         <input
//                             id={id}
//                             className='model-input-field'
//                             type={type || 'text'}
//                             value={value || data[key]}
//                             onInput={onInput || (event => editData(key, event.target.value))}
//                             ref={refs[key + 'Input']}
//                             {...props}
//                         />
//                     </div>
//                 )
//             }

//             const Textbox = ({name, id, label, value, onInput, ...props}) => {
//                 const key = (name[0].toLowerCase() + name.substr(1)).replace(/\W/g, '')
//                 id = id || name.toLowerCase().replace(/\W/g, '-') + '-textbox'
//                 refs[key + 'Textbox'] = useRef()
//                 return (
//                     <div className='modal-textbox modal-form-item'>
//                         <label htmlFor={id}>{label || name}</label>

//                         <TextareaAutosize
//                             id={id}
//                             className='model-input-field'
//                             defaultValue={value || data[key]}
//                             onInput={onInput || (event => editData(key, event.target.value))}
//                             ref={refs[key + 'Textbox']}
//                             {...props}
//                         />
//                     </div>
//                 )
//             }

//             const Checkbox = ({name, id, label, checked, onChange, ...props}) => {
//                 const key = (name[0].toLowerCase() + name.substr(1)).replace(/\W/g, '')
//                 id = id || name.toLowerCase().replace(/\W/g, '-') + '-input'
//                 refs[key + 'Checkbox'] = useRef()
//                 return (
//                     <div className='modal-checkbox modal-form-item'>
//                         <input
//                             id={id}
//                             type={'checkbox'}
//                             checked={checked || data[key]}
//                             onChange={onChange || (event => editData(key, event.target.checked))}
//                             ref={refs[key + 'Checkbox']}
//                             {...props}
//                         />
//                         <label htmlFor={id}>{label || name}</label>
//                     </div>
//                 )
//             }

//             const Dropdown = ({name, options, id, label, defaultValue, onInput, ...props}) => {
//                 const key = (name[0].toLowerCase() + name.substr(1)).replace(/\W/g, '')
//                 id = id || name.toLowerCase().replace(/\W/g, '-') + '-dropdown'
//                 refs[key + 'Dropdown'] = useRef()
//                 return (
//                     <div className='modal-dropdown modal-form-item'>
//                         <label htmlFor={id}>{label || name}</label>
                        
//                         <select
//                             id={id}
//                             className='model-input-field'
//                             defaultValue={defaultValue || data[key]}
//                             onInput={onInput || (event => editData(key, event.target.value))}
//                             ref={refs[key + 'Dropdown']}
//                             {...props}
//                         >
//                             {options.map((option, i) => 
//                                 <option key={i} value={option}>{option}</option>
//                             )}
//                         </select>
//                     </div>
//                 )
//             }

//             // const {title, company, type, startDate, endDate, location, description, imagePath} = data
//             return (
//                 <div className='modal-bg'>
//                     <div className='modal'>
//                         <CloseIcon 
//                             className='close-button'
//                             size='40'
//                             onClick={_ => setModal()} 
//                         />
//                         <h2>{(isNew ? 'New' : 'Edit') + ' Work History'}</h2>
//                         <form>
//                             <Input name='Title'/>
//                             <Input name='Company'/>
//                             <Dropdown name='Type'
//                                 options={[
//                                     'Full-time',
//                                     'Part-time',
//                                     'Contract',
//                                     'Internship',
//                                     'Self-employed',
//                                     'Freelance',
//                                     'Apprenticeship',
//                                     'Seasonal'
//                                 ]}/>
//                             <Input name='Location'/>
//                             <Input name='Start Date' type='date'/>
//                             <Input
//                                 name='End Date'
//                                 type={currentlyInRole ? 'text' : 'date'}
//                                 value={currentlyInRole ? '' : data.endDate}
//                                 disabled={currentlyInRole}
//                             />
//                             <Checkbox 
//                                 name='Currently in Role'
//                                 label='I am currently working in this role'
//                                 checked={currentlyInRole}
//                                 onChange={event => {
//                                     setCurrentlyInRole(event.target.checked)
//                                     editData('endDate', '')
//                                 }}
//                             />
//                             <Textbox
//                                 name='Description' 
//                                 defaultValue={stringifyDescription()}
//                                 onInput={_ => null}
//                                 onBlur={event => {
//                                     let value = event.target.value
//                                     // refs.descriptionTextbox.current?.focus()
//                                     editData('description', parseDescription(value))
//                                 }}
//                             />
                            
//                             <button 
//                                 onClick={event => {
//                                     console.log(refs);
//                                     event.preventDefault()

//                                     if (data.title === '') {
//                                         console.log('title is empty');
//                                         return refs.titleInput.current.focus()
//                                     }

//                                     if (data.company === '') {
//                                         return refs.companyInput.current.focus()
//                                     }

//                                     if (data.startDate === '') {
//                                         return refs.startDateInput.current.focus()
//                                     }

//                                     if (data.startDate === '' && !currentlyInRole) {
//                                         return refs.endDateInput.current.focus()
//                                     }

//                                     if (!isNew) {

                                        
//                                     // } else {
//                                     //     for (const record of workHistory) {
//                                     //         if (record.id === data.id) {
//                                     //             record = data
//                                     //             break
//                                     //         }
//                                     //     }
//                                     }
//                                 }}
//                             >Save</button>
//                         </form>
//                     </div>
//                 </div>
//             )
//         }
//     }

//     function Education() {
//         return (
//             <section id='education-section'>
//                 <h2>Education</h2>

//             </section>
//         )
//     }
}

export default Admin