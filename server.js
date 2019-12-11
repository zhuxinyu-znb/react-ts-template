/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 09:33:58
 * @LastEditTime: 2019-08-28 10:01:50
 * @LastEditors: Please set LastEditors
 */
import React from 'react'
import Router from '../src/router/router'
import ReactDomServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import compression from 'compression'
import os from 'os'
import express from 'express'
import path from 'path'
const buildPath=require('../build/asset-manifest');

const server=express();
//使用gzip格式进行传输
server.use(compression());
//获取本机IP
function getIPAddress(){
    const interfaces = os.networkInterfaces();
    for(let devName in interfaces){
        const intFace = interfaces[devName];
        for(let i=0;i<intFace.length;i++){
            const alias = intFace[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

server.use((req,res,next)=>{
    /*if(req.url==='/'){
        return res.redirect('/login');
    }*/
    if(req.url.startsWith('/assist/static') || req.url==='/assist/favicon.ico'){
        return next()
    }
    const context = {};
    const htmlStr=ReactDomServer.renderToString(
            <StaticRouter
                location={req.url}
                context={context}>
                <Router />
            </StaticRouter>
    );
    res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">
                    <title>辅助决策平台</title>
                    <link rel="shortcut icon" href="/assist/favicon.ico">
                    <link rel="stylesheet" href="${buildPath['main.css']}">
                </head>
                <body>
                    <div id="root">${htmlStr}</div>
                    <script src="${buildPath['manifest.js']}"></script>
                    <script src="${buildPath['vendor.js']}"></script>
                    <script src="${buildPath['main.js']}"></script>
                </body>
                </html>`)

});

server.use('/assist', express.static(path.resolve('build')));

server.listen(18052,()=>{
    console.log(`open Browser http://${getIPAddress()}:18052`);
});
