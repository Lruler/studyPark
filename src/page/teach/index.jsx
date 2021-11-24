import React from 'react'
import './index.css'
import poster from './img/1.png'


export default function Teach() {
  return (
    <>
      <video
        src="https://taojing888.oss-cn-hangzhou.aliyuncs.com/%E8%A7%86%E9%A2%91%E5%AD%A6%E4%B9%A0%E6%9D%90%E6%96%99.mp4"
        controls
        poster = {poster}
      />
      {/* <iframe
        title=" "
        src="//player.bilibili.com/player.html?aid=460769491&bvid=BV1A5411g7az&cid=344269894&page=1"
        scrolling="no" border="0" frameBorder="no" framespacing="0" allowFullScreen={true}> </iframe> */}
    </>
  )
}
