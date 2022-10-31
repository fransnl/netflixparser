"use strict";
document.cookie = 'SameSite=None; Secure'

const subtitles = document.getElementById('subtitle');

const title = document.createElement('p');
title.innerText = 'subs';

subtitles.appendChild(title);

let xmlContent = '';

const url = 'https://translate.google.com/translate_tts?ie=UTF-&&client=tw-ob&tl=es&q='

fetch('spanish.xml').then((res) => {
    res.text().then((xml) =>{
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDom = parser.parseFromString(xmlContent, 'application/xml');
        let subs = xmlDom.querySelectorAll('span');
        
        subs.forEach(subsXmlNode => {
            let sub = document.createElement('p');
            let sound = document.createElement('audio');
            sub.innerText = subsXmlNode.innerHTML;
            sound.controls = 'controls';
            sound.type = 'audio/mpeg';
            sound.src = url + encodeURIComponent(sub.innerText);
            subtitles.appendChild(sub);
            subtitles.appendChild(sound);
        });
    });
});
