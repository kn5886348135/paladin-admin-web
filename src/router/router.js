// import React from 'react'
// import { Router } from 'react-router'
// import routes from '../routes/Root/index.js'
// import { history } from '../store/routing'

// const Root = (props)=>{
//     return(
//         <Router history={history} routes={routes} />
//     )
// }

// 权限在路由上的控制问题？
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
        key:'/index/user',
        role: ['user'],
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
                key: '/index/user/add',
                title: '添加用户',
                path: '/index/user/add',
                icon:'',
                role: ['information']
            }
        ]
    },
    {
        title:'部门管理',
        icon:'bars',
        path:'/index/department',
        name:'department',
        meta:{
            icon:'',
            title:''
        },
        children:[
            {
                path: '/index/department/list',
                title:'部门列表',
                icon:''
            },
            {
                path: '/index/department/add',
                title:'添加部门',
                icon:''
            },
            {
                path: '/index/department/addform',
                title:'添加部门表单封装',
                icon:''
            }
        ]
    },
    {
        title:'职位管理',
        icon:'edit',
        path:'/index/job',
        name:'index',
        meta:{
            icon:'',
            title:''
        },
        children:[
            {
                path: 'index/job/list',
                title:'职位列表',
                icon:''
            },
            {
                path: 'index/job/add',
                title:'添加职位',
                icon:''
            }
        ]
    },{
        title:'职员管理',
        icon:'edit',
        path:'/index/staff',
        name:'index',
        meta:{
            icon:'',
            title:''
        },
        children:[
            {
                path: 'index/staff/list',
                title:'职位列表',
                icon:''
            },
            {
                path: 'index/staff/add',
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