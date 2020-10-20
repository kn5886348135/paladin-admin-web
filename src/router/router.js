// import React from 'react'
// import { Router } from 'react-router'
// import routes from '../routes/Root/index.js'
// import { history } from '../store/routing'

// const Root = (props)=>{
//     return(
//         <Router history={history} routes={routes} />
//     )
// }

// export default Root
const router = [
    {
        title:'控制台',
        icon:'index',
        path:'/index',
        name:'index',
        meta:{
            icon:'',
            title:''
        },
        // children:[
        //     {
                
        //     }
        // ]
    },
    {
        title:'用户管理',
        icon:'laptop',
        path:'/index/user',
        name:'index',
        meta:{
            icon:'',
            title:''
        },
        children:[
            {
                path: '/index/user/list',
                title:'用户列表',
                icon:''
            },
            {
                path: '/index/user/add',
                title:'添加用户',
                icon:''
            }
        ]
    },
    {
        title:'部门管理',
        icon:'bars',
        path:'/index/navigation',
        name:'index',
        meta:{
            icon:'',
            title:''
        },
        children:[
            {
                path: 'index/navigation/dropdown',
                title:'部门列表',
                icon:''
            },
            {
                path: 'index/navigation/menu',
                title:'添加部门',
                icon:''
            }
        ]
    },
    {
        title:'职位管理',
        icon:'edit',
        path:'/index/entry',
        name:'index',
        meta:{
            icon:'',
            title:''
        },
        children:[
            {
                path: 'index/entry/basic-form',
                title:'职位列表',
                icon:''
            },
            {
                path: 'index/entry/step-form',
                title:'添加职位',
                icon:''
            }
        ]
    },
    {
        title:'请假',
        icon:'info-circle-o',
        path:'/index/about',
        name:'index'
    },
    {
        title:'加班',
        icon:'info-circle-o',
        path:'/index/abouts',
        name:'index',
    }
    
]

export default router