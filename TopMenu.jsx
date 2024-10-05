import React from 'react'
import { Input, Menu } from 'semantic-ui-react'

function TopMenu() {

  return (
    <Menu secondary>
      <Menu.Item>Dev @ Deakin</Menu.Item>
      <Input style={{ width: '60%', margin: "auto" }} iconPosition='left' icon='search' placeholder='Search...' />
      <Menu.Menu position="right">
        <Menu.Item>
          Post
        </Menu.Item>
        <Menu.Item name='login'>
          <a href='/login'>Login</a>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default TopMenu