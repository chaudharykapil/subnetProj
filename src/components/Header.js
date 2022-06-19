import React from 'react'
import './mystyle.css';

// 1 June 2022
//company name, tool name and help button added and their styles
//mystyle.css file is added for header.js

export default function Header() {
  return (
    <div class="myheader">
    <div class="div-container">

      <div class="div-style companynamestyle">Morgan Stanley</div>
      <div class="div-style toolnamestyle">Subnet Allocation Tool</div>
      <div class="div-style helpbtn">Help</div>
    </div>
    </div>
  )
}
