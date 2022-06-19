import React, { Component , useState, useEffect } from 'react'
import Header from '../components/Header'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import createElement from '../components/Elements';
export default function MainScreen (){
  
  const [filedata,setfiledata] = useState({})
  const [Data,setData] = useState([])
	function checkselect(e){
		renderFile(e.name)
	}
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/getfolderstructure").then(e=>{
      e.text().then(v=>{
        setData(JSON.parse(v)['data'])
       
      })
    })
  },[])
	function createTree(node){
		if(node.type == "file"){
			return <TreeItem nodeId={String(Math.random()*100)} key = {String(Math.random()*100)} label={node.name} onClick = {()=>checkselect(node)} />
		}
		return <TreeItem nodeId={String(Math.random()*100)} key = {String(Math.random()*100)} label={node.name}>
							{
								node.children.map((n,id)=>{
									return createTree(n)
								})
							}
						</TreeItem>
	}
  function createUI(data){
    if(!data["multiple"]){
      console.log(data["type"])
      return <>{createElement(data["type"])}</>
    }
    return data["valid_keys_in_items"].map((element,idx) => {
      return createUI(element)
    });
  }
  function renderFile(filepath){
		fetch("http://127.0.0.1:8000/getfiledata/"+filepath).then(res=>{
			res.text().then(val=>{
        let jsn = JSON.parse(val)
        console.log(jsn["root"])
				setfiledata(jsn)
			})
		})
  }
    return (
      <div className='flex flex-col h-screen'>
          <div>
              <Header />
          </div>
          <div className='flex flex-row h-full'>
              <div className='flex w-1/3 bg-white-100 h-full'>
                <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                {	
									Data.map((node,idx)=>createTree(node,idx))
								}
                </TreeView>
              </div>


              <div className='flex w-2/3 bg-blue-100 h-full justify-center items-center'>
              <div className='flex flex-col justify-around h-full'>
                {
                  filedata["root"]?filedata["root"].map((element,idx) => {
                    return createUI(element)
                  }):null
                }
              </div>

                {/* <AceEditor
                placeholder=""
                height='100vh'
                width='100%'
                theme="Agolawhite"
                name="blah2"
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={filedata}
                setOptions={{
                showLineNumbers: true,
                tabSize: 2,
                }}/> */}
                        
              </div>
          </div>
      </div>
    )
}
