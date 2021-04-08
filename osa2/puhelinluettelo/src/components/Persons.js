import React from 'react'
import Person from './Person'

const PersonsList = (props) => {
    const {persons, newFilter, removePerson} = props


    
    return (
            <ul>
                {persons.map(person => {
                    return (
                    <li key={person.name}>     
                        <Person person={person} removePerson={removePerson}/>
                    </li>
                    )
                }

                )}
            </ul>
    )
}

export default PersonsList