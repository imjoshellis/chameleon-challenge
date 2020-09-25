/* 

Prompt:
  We have defined a basic dropdown via the Dropdown and DropdownItem components below, with example usage in the ExampleNav component.
  The Dropdown and DropdownItem components have some problems, and also have room for improvements.
  Please fix any obvious bugs you see with the dropdown, and explain your reasoning.
  Please then describe some improvements you would make to the dropdown, and how you would implement them.
  Consider the different contexts in which you might use this dropdown and what changes might be neccessary to make it more flexible.
  
  Follow up question: if we wanted to sync this dropdown selection to the server with app.sync('PATCH', 'user', { dropdown_1_state: {true,false} }) where would this be included
  
  PS: No need to worry about CSS.

 */

import React, { PureComponent } from 'react'

class Dropdown extends PureComponent {
  // fixed typo
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    const { isOpen } = this.state

    // fixed changing state so it actually toggles when toggle is called
    this.setState(
      { isOpen: !isOpen } /*, (state) => app.sync() would go here */
    )
  }

  render () {
    const { isOpen } = this.state
    const { label } = this.props

    return (
      <div className='dropdown'>
        <button
          type='button'
          className='dropdown-button'
          id='dropdownButton'
          aria-haspopup='true'
          // fixed typo
          aria-expanded={isOpen}
          // fixed function call so 'this' functions correctly
          onClick={() => this.toggle()}
        >
          {label}
        </button>

        <ul
          className={`${isOpen ? 'dropdown-open' : ''} dropdown-menu`}
          aria-labelledby='dropdownButton'
          role='menu'
        >
          {this.props.children}
        </ul>
      </div>
    )
  }
}

class DropdownItem extends PureComponent {
  render () {
    const { href, onClick, ariaLabel } = this.props
    return (
      <li>
        {/* Simple <li> with <a> to fit the parent <ul> 

            Adding onClick prop allows custom behaviors
            beyond simple link clicks

            Adding ariaLabel prop will be 
            good for accessibility 

            To avoid use cases getting out of control, 
            I probably lean towards a label prop for the 
            text rather than rendering children.

            Another thing to consider is having 
            a <DropdownButton /> and <DropdownLink /> 
            for different types of interaction use cases
            */}
        <a
          href={href ? href : null}
          onClick={onClick ? () => onClick() : null}
          aria-label={ariaLabel}
        >
          {this.props.children}
        </a>
      </li>
    )
  }
}

class ExampleNav extends PureComponent {
  render () {
    return (
      <nav>
        <a href='/page1'>Page 1</a>
        <Dropdown label='More items'>
          <DropdownItem href='/page2'>Page 2</DropdownItem>
          <DropdownItem href='/page3'>Page 3</DropdownItem>
          <DropdownItem href='/page4'>Page 4</DropdownItem>
        </Dropdown>
        <Dropdown label='Even more items'>
          <DropdownItem href='/page5'>Page 5</DropdownItem>
          <DropdownItem href='/page6'>Page 6</DropdownItem>
        </Dropdown>
      </nav>
    )
  }
}

export default ExampleNav
