function encrypt(data)
{
    if ( password1 )
    {
        encrypted1 = encryptWithAES(password1, data);
        encrypted = encrypted1;
    }
    else
    {
        return false;
    }
    if ( password2 )
    {
        encrypted2 = encryptWithTwofish(password2, encrypted1);
        encrypted = encrypted2;
    }
    if ( password3 )
    {
        encrypted3 = encryptWithAES(password3, encrypted2);
        encrypted = encrypted3;
    }
    return encrypted;
}

function decrypt(data)
{
    decrypted = data;
    if ( password3 )
    {
        decrypted3 = decryptWithAES(password3, data);
        decrypted = decrypted3;
    }

    if ( password2 )
    {
        decrypted2 = decryptWithTwofish(password2, decrypted);
        decrypted = decrypted2;
    }

    if ( password1 )
    {
        decrypted1 = decryptWithAES(password1, decrypted);
        decrypted = decrypted1;
    }
    else
    {
        return false;
    }

    return decrypted;
}

function encryptWithTwofish(password, data)
{
    return CryptoJS.TwoFish.encrypt(data, password).toString();
}

function decryptWithTwofish(password, data)
{
    return CryptoJS.TwoFish.decrypt(data, password).toString(CryptoJS.enc.Utf8);
}

function encryptWithAES(password, data)
{
    return CryptoJS.AES.encrypt(data, password).toString();
}

function decryptWithAES(password, data)
{
    return CryptoJS.AES.decrypt(data, password).toString(CryptoJS.enc.Utf8);
}


/*
rollups/aes.js
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();


/* Based on org.bouncycastle.crypto.engines.TwofishEngine
 * originally licensed under these terms:
 *
 * Copyright (c) 2000 - 2012 The Legion Of The Bouncy Castle
 * (http://www.bouncycastle.org)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/*global CryptoJS:true */
(function () {
    'use strict';

    // Shortcuts
    var C = CryptoJS,
        C_lib = C.lib,
        BlockCipher = C_lib.BlockCipher,
        C_algo = C.algo,
        P = [
            [ // p0
            0xA9, 0x67, 0xB3, 0xE8,
            0x04, 0xFD, 0xA3, 0x76,
            0x9A, 0x92, 0x80, 0x78,
            0xE4, 0xDD, 0xD1, 0x38,
            0x0D, 0xC6, 0x35, 0x98,
            0x18, 0xF7, 0xEC, 0x6C,
            0x43, 0x75, 0x37, 0x26,
            0xFA, 0x13, 0x94, 0x48,
            0xF2, 0xD0, 0x8B, 0x30,
            0x84, 0x54, 0xDF, 0x23,
            0x19, 0x5B, 0x3D, 0x59,
            0xF3, 0xAE, 0xA2, 0x82,
            0x63, 0x01, 0x83, 0x2E,
            0xD9, 0x51, 0x9B, 0x7C,
            0xA6, 0xEB, 0xA5, 0xBE,
            0x16, 0x0C, 0xE3, 0x61,
            0xC0, 0x8C, 0x3A, 0xF5,
            0x73, 0x2C, 0x25, 0x0B,
            0xBB, 0x4E, 0x89, 0x6B,
            0x53, 0x6A, 0xB4, 0xF1,
            0xE1, 0xE6, 0xBD, 0x45,
            0xE2, 0xF4, 0xB6, 0x66,
            0xCC, 0x95, 0x03, 0x56,
            0xD4, 0x1C, 0x1E, 0xD7,
            0xFB, 0xC3, 0x8E, 0xB5,
            0xE9, 0xCF, 0xBF, 0xBA,
            0xEA, 0x77, 0x39, 0xAF,
            0x33, 0xC9, 0x62, 0x71,
            0x81, 0x79, 0x09, 0xAD,
            0x24, 0xCD, 0xF9, 0xD8,
            0xE5, 0xC5, 0xB9, 0x4D,
            0x44, 0x08, 0x86, 0xE7,
            0xA1, 0x1D, 0xAA, 0xED,
            0x06, 0x70, 0xB2, 0xD2,
            0x41, 0x7B, 0xA0, 0x11,
            0x31, 0xC2, 0x27, 0x90,
            0x20, 0xF6, 0x60, 0xFF,
            0x96, 0x5C, 0xB1, 0xAB,
            0x9E, 0x9C, 0x52, 0x1B,
            0x5F, 0x93, 0x0A, 0xEF,
            0x91, 0x85, 0x49, 0xEE,
            0x2D, 0x4F, 0x8F, 0x3B,
            0x47, 0x87, 0x6D, 0x46,
            0xD6, 0x3E, 0x69, 0x64,
            0x2A, 0xCE, 0xCB, 0x2F,
            0xFC, 0x97, 0x05, 0x7A,
            0xAC, 0x7F, 0xD5, 0x1A,
            0x4B, 0x0E, 0xA7, 0x5A,
            0x28, 0x14, 0x3F, 0x29,
            0x88, 0x3C, 0x4C, 0x02,
            0xB8, 0xDA, 0xB0, 0x17,
            0x55, 0x1F, 0x8A, 0x7D,
            0x57, 0xC7, 0x8D, 0x74,
            0xB7, 0xC4, 0x9F, 0x72,
            0x7E, 0x15, 0x22, 0x12,
            0x58, 0x07, 0x99, 0x34,
            0x6E, 0x50, 0xDE, 0x68,
            0x65, 0xBC, 0xDB, 0xF8,
            0xC8, 0xA8, 0x2B, 0x40,
            0xDC, 0xFE, 0x32, 0xA4,
            0xCA, 0x10, 0x21, 0xF0,
            0xD3, 0x5D, 0x0F, 0x00,
            0x6F, 0x9D, 0x36, 0x42,
            0x4A, 0x5E, 0xC1, 0xE0],
            [ // p1
            0x75, 0xF3, 0xC6, 0xF4,
            0xDB, 0x7B, 0xFB, 0xC8,
            0x4A, 0xD3, 0xE6, 0x6B,
            0x45, 0x7D, 0xE8, 0x4B,
            0xD6, 0x32, 0xD8, 0xFD,
            0x37, 0x71, 0xF1, 0xE1,
            0x30, 0x0F, 0xF8, 0x1B,
            0x87, 0xFA, 0x06, 0x3F,
            0x5E, 0xBA, 0xAE, 0x5B,
            0x8A, 0x00, 0xBC, 0x9D,
            0x6D, 0xC1, 0xB1, 0x0E,
            0x80, 0x5D, 0xD2, 0xD5,
            0xA0, 0x84, 0x07, 0x14,
            0xB5, 0x90, 0x2C, 0xA3,
            0xB2, 0x73, 0x4C, 0x54,
            0x92, 0x74, 0x36, 0x51,
            0x38, 0xB0, 0xBD, 0x5A,
            0xFC, 0x60, 0x62, 0x96,
            0x6C, 0x42, 0xF7, 0x10,
            0x7C, 0x28, 0x27, 0x8C,
            0x13, 0x95, 0x9C, 0xC7,
            0x24, 0x46, 0x3B, 0x70,
            0xCA, 0xE3, 0x85, 0xCB,
            0x11, 0xD0, 0x93, 0xB8,
            0xA6, 0x83, 0x20, 0xFF,
            0x9F, 0x77, 0xC3, 0xCC,
            0x03, 0x6F, 0x08, 0xBF,
            0x40, 0xE7, 0x2B, 0xE2,
            0x79, 0x0C, 0xAA, 0x82,
            0x41, 0x3A, 0xEA, 0xB9,
            0xE4, 0x9A, 0xA4, 0x97,
            0x7E, 0xDA, 0x7A, 0x17,
            0x66, 0x94, 0xA1, 0x1D,
            0x3D, 0xF0, 0xDE, 0xB3,
            0x0B, 0x72, 0xA7, 0x1C,
            0xEF, 0xD1, 0x53, 0x3E,
            0x8F, 0x33, 0x26, 0x5F,
            0xEC, 0x76, 0x2A, 0x49,
            0x81, 0x88, 0xEE, 0x21,
            0xC4, 0x1A, 0xEB, 0xD9,
            0xC5, 0x39, 0x99, 0xCD,
            0xAD, 0x31, 0x8B, 0x01,
            0x18, 0x23, 0xDD, 0x1F,
            0x4E, 0x2D, 0xF9, 0x48,
            0x4F, 0xF2, 0x65, 0x8E,
            0x78, 0x5C, 0x58, 0x19,
            0x8D, 0xE5, 0x98, 0x57,
            0x67, 0x7F, 0x05, 0x64,
            0xAF, 0x63, 0xB6, 0xFE,
            0xF5, 0xB7, 0x3C, 0xA5,
            0xCE, 0xE9, 0x68, 0x44,
            0xE0, 0x4D, 0x43, 0x69,
            0x29, 0x2E, 0xAC, 0x15,
            0x59, 0xA8, 0x0A, 0x9E,
            0x6E, 0x47, 0xDF, 0x34,
            0x35, 0x6A, 0xCF, 0xDC,
            0x22, 0xC9, 0xC0, 0x9B,
            0x89, 0xD4, 0xED, 0xAB,
            0x12, 0xA2, 0x0D, 0x52,
            0xBB, 0x02, 0x2F, 0xA9,
            0xD7, 0x61, 0x1E, 0xB4,
            0x50, 0x04, 0xF6, 0xC2,
            0x16, 0x25, 0x86, 0x56,
            0x55, 0x09, 0xBE, 0x91]
        ],
        P_00 = 1,
        P_01 = 0,
        P_02 = 0,
        P_03 = 1,
        P_04 = 1,
        P_10 = 0,
        P_11 = 0,
        P_12 = 1,
        P_13 = 1,
        P_14 = 0,
        P_20 = 1,
        P_21 = 1,
        P_22 = 0,
        P_23 = 0,
        P_24 = 0,
        P_30 = 0,
        P_31 = 1,
        P_32 = 1,
        P_33 = 0,
        P_34 = 1,

        /* Primitive polynomial for GF(256) */
        GF256_FDBK = 0x169,
        GF256_FDBK_2 = GF256_FDBK / 2,
        GF256_FDBK_4 = GF256_FDBK / 4,

        RS_GF_FDBK = 0x14D,
        SK_STEP = 0x02020202,
        SK_BUMP = 0x01010101,
        SK_ROTL = 9, // field generator
        gMDS0 = [],
        gMDS1 = [],
        gMDS2 = [],
        gMDS3 = [],
        gSubKeys = [],
        gSBox = [],
        k64Cnt = 0,
        getByte = function (x, n) {
        return (x >>> (n * 8)) & 0xFF;
        },
        switchEndianness = function (word) {
            return ((word & 0xff) << 24) | (((word >> 8) & 0xff) << 16) | (((word >> 16) & 0xff) << 8) | ((word >> 24) & 0xff);
        },
        LFSR1 = function (x) {
            return (x >> 1) ^ (((x & 0x01) !== 0) ? GF256_FDBK_2 : 0);
        },
        LFSR2 = function (x) {
            return (x >> 2) ^ (((x & 0x02) !== 0) ? GF256_FDBK_2 : 0) ^ (((x & 0x01) !== 0) ? GF256_FDBK_4 : 0);
        },
        Mx_X = function (x) {
            return x ^ LFSR2(x);
        }, // 5B
        Mx_Y = function (x) {
            return x ^ LFSR1(x) ^ LFSR2(x);
        }, // EF
        RS_rem = function (x) {
            var b = (x >>> 24) & 0xff,
                g2 = ((b << 1) ^ ((b & 0x80) !== 0 ? RS_GF_FDBK : 0)) & 0xff,
                g3 = ((b >>> 1) ^ ((b & 0x01) !== 0 ? (RS_GF_FDBK >>> 1) : 0)) ^ g2;
            return ((x << 8) ^ (g3 << 24) ^ (g2 << 16) ^ (g3 << 8) ^ b);
        },
        RS_MDS_Encode = function (k0, k1) {
            var r = k1,
                i;
            for (i = 0; i < 4; i += 1) // shift 1 byte at a time
            {
                r = RS_rem(r);
            }
            r ^= k0;
            for (i = 0; i < 4; i += 1) {
                r = RS_rem(r);
            }

            return r;
        },
        F32 = function (x, k32) {
            var b0 = getByte(x, 0),
                b1 = getByte(x, 1),
                b2 = getByte(x, 2),
                b3 = getByte(x, 3),
                k0 = k32[0],
                k1 = k32[1],
                k2 = k32[2],
                k3 = k32[3],
                result = 0;

            switch (k64Cnt & 3) {
            case 1:
                result = gMDS0[(P[P_01][b0] & 0xff) ^ getByte(k0, 0)] ^ gMDS1[(P[P_11][b1] & 0xff) ^ getByte(k0, 1)] ^ gMDS2[(P[P_21][b2] & 0xff) ^ getByte(k0, 2)] ^ gMDS3[(P[P_31][b3] & 0xff) ^ getByte(k0, 3)];
                break;
            case 0:
                /* 256 bits of key */
                b0 = (P[P_04][b0] & 0xff) ^ getByte(k3, 0);
                b1 = (P[P_14][b1] & 0xff) ^ getByte(k3, 1);
                b2 = (P[P_24][b2] & 0xff) ^ getByte(k3, 2);
                b3 = (P[P_34][b3] & 0xff) ^ getByte(k3, 3);
            case 3:
                b0 = (P[P_03][b0] & 0xff) ^ getByte(k2, 0);
                b1 = (P[P_13][b1] & 0xff) ^ getByte(k2, 1);
                b2 = (P[P_23][b2] & 0xff) ^ getByte(k2, 2);
                b3 = (P[P_33][b3] & 0xff) ^ getByte(k2, 3);
            case 2:
                result = gMDS0[(P[P_01][(P[P_02][b0] & 0xff) ^ getByte(k1, 0)] & 0xff) ^ getByte(k0, 0)] ^ gMDS1[(P[P_11][(P[P_12][b1] & 0xff) ^ getByte(k1, 1)] & 0xff) ^ getByte(k0, 1)] ^ gMDS2[(P[P_21][(P[P_22][b2] & 0xff) ^ getByte(k1, 2)] & 0xff) ^ getByte(k0, 2)] ^ gMDS3[(P[P_31][(P[P_32][b3] & 0xff) ^ getByte(k1, 3)] & 0xff) ^ getByte(k0, 3)];
                break;
            }
            return result;
        },
        Fe32_0 = function (x) {
            return gSBox[0x000 + 2 * (x & 0xff)] ^ gSBox[0x001 + 2 * ((x >>> 8) & 0xff)] ^ gSBox[0x200 + 2 * ((x >>> 16) & 0xff)] ^ gSBox[0x201 + 2 * ((x >>> 24) & 0xff)];
        },
        Fe32_3 = function (x) {
            return gSBox[0x000 + 2 * ((x >>> 24) & 0xff)] ^ gSBox[0x001 + 2 * (x & 0xff)] ^ gSBox[0x200 + 2 * ((x >>> 8) & 0xff)] ^ gSBox[0x201 + 2 * ((x >>> 16) & 0xff)];
        },
        TwoFish = C_algo.TwoFish = BlockCipher.extend({
            _doReset: function () {
                var k32e = [],
                    k32o = [],
                    sBoxKeys = [],
                    i, p, q, A, B, k0, k1, k2, k3,
                    b0, b1, b2, b3, m1 = [],
                    mX = [],
                    mY = [],
                    j;
                k64Cnt = this._key.sigBytes / 8;

                // calculate the MDS matrix

                for (i = 0; i < 256; i += 1) {
                    j = P[0][i] & 0xff;
                    m1[0] = j;
                    mX[0] = Mx_X(j) & 0xff;
                    mY[0] = Mx_Y(j) & 0xff;

                    j = P[1][i] & 0xff;
                    m1[1] = j;
                    mX[1] = Mx_X(j) & 0xff;
                    mY[1] = Mx_Y(j) & 0xff;

                    gMDS0[i] = m1[P_00] | mX[P_00] << 8 | mY[P_00] << 16 | mY[P_00] << 24;

                    gMDS1[i] = mY[P_10] | mY[P_10] << 8 | mX[P_10] << 16 | m1[P_10] << 24;

                    gMDS2[i] = mX[P_20] | mY[P_20] << 8 | m1[P_20] << 16 | mY[P_20] << 24;

                    gMDS3[i] = mX[P_30] | m1[P_30] << 8 | mY[P_30] << 16 | mX[P_30] << 24;
                }

                if (k64Cnt < 1) {
                    throw "Key size less than 64 bits";
                }

                if (k64Cnt > 4) {
                    throw "Key size larger than 256 bits";
                }

                /*
                 * k64Cnt is the number of 8 byte blocks (64 chunks)
                 * that are in the input key.  The input key is a
                 * maximum of 32 bytes (256 bits), so the range
                 * for k64Cnt is 1..4
                 */
                for (i = 0; i < k64Cnt; i++) {
                    p = i * 2;

                    // to BE
                    k32e[i] = switchEndianness(this._key.words[p]);
                    k32o[i] = switchEndianness(this._key.words[p + 1]);

                    sBoxKeys[k64Cnt - 1 - i] = RS_MDS_Encode(k32e[i], k32o[i]);
                }

                for (i = 0; i < 40 / 2; i++) {
                    q = i * SK_STEP;
                    A = F32(q, k32e);
                    B = F32(q + SK_BUMP, k32o);
                    B = B << 8 | B >>> 24;
                    A += B;
                    gSubKeys[i * 2] = A;
                    A += B;
                    gSubKeys[i * 2 + 1] = A << SK_ROTL | A >>> (32 - SK_ROTL);
                }

                /*
                 * fully expand the table for speed
                 */
                k0 = sBoxKeys[0];
                k1 = sBoxKeys[1];
                k2 = sBoxKeys[2];
                k3 = sBoxKeys[3];
                gSBox = [];
                for (i = 0; i < 256; i++) {
                    b0 = b1 = b2 = b3 = i;
                    switch (k64Cnt & 3) {
                    case 1:
                        gSBox[i * 2] = gMDS0[(P[P_01][b0] & 0xff) ^ getByte(k0, 0)];
                        gSBox[i * 2 + 1] = gMDS1[(P[P_11][b1] & 0xff) ^ getByte(k0, 1)];
                        gSBox[i * 2 + 0x200] = gMDS2[(P[P_21][b2] & 0xff) ^ getByte(k0, 2)];
                        gSBox[i * 2 + 0x201] = gMDS3[(P[P_31][b3] & 0xff) ^ getByte(k0, 3)];
                        break;
                    case 0:
                        /* 256 bits of key */
                        b0 = (P[P_04][b0] & 0xff) ^ getByte(k3, 0);
                        b1 = (P[P_14][b1] & 0xff) ^ getByte(k3, 1);
                        b2 = (P[P_24][b2] & 0xff) ^ getByte(k3, 2);
                        b3 = (P[P_34][b3] & 0xff) ^ getByte(k3, 3);
                    case 3:
                        b0 = (P[P_03][b0] & 0xff) ^ getByte(k2, 0);
                        b1 = (P[P_13][b1] & 0xff) ^ getByte(k2, 1);
                        b2 = (P[P_23][b2] & 0xff) ^ getByte(k2, 2);
                        b3 = (P[P_33][b3] & 0xff) ^ getByte(k2, 3);
                    case 2:
                        gSBox[i * 2] = gMDS0[(P[P_01]
                        [(P[P_02][b0] & 0xff) ^ getByte(k1, 0)] & 0xff) ^ getByte(k0, 0)];
                        gSBox[i * 2 + 1] = gMDS1[(P[P_11]
                        [(P[P_12][b1] & 0xff) ^ getByte(k1, 1)] & 0xff) ^ getByte(k0, 1)];
                        gSBox[i * 2 + 0x200] = gMDS2[(P[P_21]
                        [(P[P_22][b2] & 0xff) ^ getByte(k1, 2)] & 0xff) ^ getByte(k0, 2)];
                        gSBox[i * 2 + 0x201] = gMDS3[(P[P_31]
                        [(P[P_32][b3] & 0xff) ^ getByte(k1, 3)] & 0xff) ^ getByte(k0, 3)];
                        break;
                    }
                }
                return;
            },
            decryptBlock: function (M, offset) {
                var x2 = switchEndianness(M[offset]) ^ gSubKeys[4],
                    x3 = switchEndianness(M[offset + 1]) ^ gSubKeys[5],
                    x0 = switchEndianness(M[offset + 2]) ^ gSubKeys[6],
                    x1 = switchEndianness(M[offset + 3]) ^ gSubKeys[7],
                    k = 8 + 2 * 16 - 1,
                    t0, t1, r;
                for (r = 0; r < 16; r += 2) {
                    t0 = Fe32_0(x2);
                    t1 = Fe32_3(x3);
                    x1 ^= t0 + 2 * t1 + gSubKeys[k--];
                    x0 = (x0 << 1 | x0 >>> 31) ^ (t0 + t1 + gSubKeys[k--]);
                    x1 = x1 >>> 1 | x1 << 31;

                    t0 = Fe32_0(x0);
                    t1 = Fe32_3(x1);
                    x3 ^= t0 + 2 * t1 + gSubKeys[k--];
                    x2 = (x2 << 1 | x2 >>> 31) ^ (t0 + t1 + gSubKeys[k--]);
                    x3 = x3 >>> 1 | x3 << 31;
                }

                M[offset] = switchEndianness(x0 ^ gSubKeys[0]);
                M[offset + 1] = switchEndianness(x1 ^ gSubKeys[1]);
                M[offset + 2] = switchEndianness(x2 ^ gSubKeys[2]);
                M[offset + 3] = switchEndianness(x3 ^ gSubKeys[3]);
            },
            encryptBlock: function (M, offset) {
                var x0 = switchEndianness(M[offset]) ^ gSubKeys[0],
                    x1 = switchEndianness(M[offset + 1]) ^ gSubKeys[1],
                    x2 = switchEndianness(M[offset + 2]) ^ gSubKeys[2],
                    x3 = switchEndianness(M[offset + 3]) ^ gSubKeys[3],
                    k = 8,
                    t0, t1, r;
                for (r = 0; r < 16; r += 2) {
                    t0 = Fe32_0(x0);
                    t1 = Fe32_3(x1);
                    x2 ^= t0 + t1 + gSubKeys[k++];
                    x2 = x2 >>> 1 | x2 << 31;
                    x3 = (x3 << 1 | x3 >>> 31) ^ (t0 + 2 * t1 + gSubKeys[k++]);

                    t0 = Fe32_0(x2);
                    t1 = Fe32_3(x3);
                    x0 ^= t0 + t1 + gSubKeys[k++];
                    x0 = x0 >>> 1 | x0 << 31;
                    x1 = (x1 << 1 | x1 >>> 31) ^ (t0 + 2 * t1 + gSubKeys[k++]);
                }

                M[offset] = switchEndianness(x2 ^ gSubKeys[4]);
                M[offset + 1] = switchEndianness(x3 ^ gSubKeys[5]);
                M[offset + 2] = switchEndianness(x0 ^ gSubKeys[6]);
                M[offset + 3] = switchEndianness(x1 ^ gSubKeys[7]);
            }
        });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.TwoFish.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.TwoFish.decrypt(ciphertext, key, cfg);
     */
    C.TwoFish = BlockCipher._createHelper(TwoFish);

}());