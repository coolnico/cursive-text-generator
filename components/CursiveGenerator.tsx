"use client";

import React, { useState } from 'react';
import Toast from './Toast';

type FontMode = 'unicode' | 'web';

interface FontItem {
    name: string;
    mode: FontMode;
    variable?: string;
    transform?: (text: string) => string;
}

// --- Unicode Mappers ---

const mapChars = (text: string, map: { [key: string]: string }) => {
    return text.split('').map(char => map[char] || char).join('');
};

// Reverse mapping function to convert Unicode characters back to normal
const toNormalText = (text: string) => {
    // Create a comprehensive reverse map from all Unicode characters to normal characters
    const reverseMap: { [key: string]: string } = {};
    
    // Build reverse map from all transformation functions
    const allMaps = [
        // Script Bold
        { '𝓐': 'A', '𝓑': 'B', '𝓒': 'C', '𝓓': 'D', '𝓔': 'E', '𝓕': 'F', '𝓖': 'G', '𝓗': 'H', '𝓘': 'I', '𝓙': 'J', '𝓚': 'K', '𝓛': 'L', '𝓜': 'M', '𝓝': 'N', '𝓞': 'O', '𝓟': 'P', '𝓠': 'Q', '𝓡': 'R', '𝓢': 'S', '𝓣': 'T', '𝓤': 'U', '𝓥': 'V', '𝓦': 'W', '𝓧': 'X', '𝓨': 'Y', '𝓩': 'Z', '𝓪': 'a', '𝓫': 'b', '𝓬': 'c', '𝓭': 'd', '𝓮': 'e', '𝓯': 'f', '𝓰': 'g', '𝓱': 'h', '𝓲': 'i', '𝓳': 'j', '𝓴': 'k', '𝓵': 'l', '𝓶': 'm', '𝓷': 'n', '𝓸': 'o', '𝓹': 'p', '𝓺': 'q', '𝓻': 'r', '𝓼': 's', '𝓽': 't', '𝓾': 'u', '𝓿': 'v', '𝔀': 'w', '𝔁': 'x', '𝔂': 'y', '𝔃': 'z' },
        // Script
        { '𝒜': 'A', 'ℬ': 'B', '𝒞': 'C', '𝒟': 'D', 'ℰ': 'E', 'ℱ': 'F', '𝒢': 'G', 'ℋ': 'H', 'ℐ': 'I', '𝒥': 'J', '𝒦': 'K', 'ℒ': 'L', 'ℳ': 'M', '𝒩': 'N', '𝒪': 'O', '𝒫': 'P', '𝒬': 'Q', 'ℛ': 'R', '𝒮': 'S', '𝒯': 'T', '𝒰': 'U', '𝒱': 'V', '𝒲': 'W', '𝒳': 'X', '𝒴': 'Y', '𝒵': 'Z', '𝒶': 'a', '𝒷': 'b', '𝒸': 'c', '𝒹': 'd', 'ℯ': 'e', '𝒻': 'f', 'ℊ': 'g', '𝒽': 'h', '𝒾': 'i', '𝒿': 'j', '𝓀': 'k', '𝓁': 'l', '𝓂': 'm', '𝓃': 'n', 'ℴ': 'o', '𝓅': 'p', '𝓆': 'q', '𝓇': 'r', '𝓈': 's', '𝓉': 't', '𝓊': 'u', '𝓋': 'v', '𝓌': 'w', '𝓍': 'x', '𝓎': 'y', '𝓏': 'z' },
        // Gothic Bold
        { '𝕬': 'A', '𝕭': 'B', '𝕮': 'C', '𝕯': 'D', '𝕰': 'E', '𝕱': 'F', '𝕲': 'G', '𝕳': 'H', '𝕴': 'I', '𝕵': 'J', '𝕶': 'K', '𝕷': 'L', '𝕸': 'M', '𝕹': 'N', '𝕺': 'O', '𝕻': 'P', '𝕼': 'Q', '𝕽': 'R', '𝕾': 'S', '𝕿': 'T', '𝖀': 'U', '𝖁': 'V', '𝖂': 'W', '𝖃': 'X', '𝖄': 'Y', '𝖅': 'Z', '𝖆': 'a', '𝖇': 'b', '𝖈': 'c', '𝖉': 'd', '𝖊': 'e', '𝖋': 'f', '𝖌': 'g', '𝖍': 'h', '𝖎': 'i', '𝖏': 'j', '𝖐': 'k', '𝖑': 'l', '𝖒': 'm', '𝖓': 'n', '𝖔': 'o', '𝖕': 'p', '𝖖': 'q', '𝖗': 'r', '𝖘': 's', '𝖙': 't', '𝖚': 'u', '𝖛': 'v', '𝖜': 'w', '𝖝': 'x', '𝖞': 'y', '𝖟': 'z' },
        // Gothic
        { '𝔄': 'A', '𝔅': 'B', 'ℭ': 'C', '𝔇': 'D', '𝔈': 'E', '𝔉': 'F', '𝔊': 'G', 'ℌ': 'H', 'ℑ': 'I', '𝔍': 'J', '𝔎': 'K', '𝔏': 'L', '𝔐': 'M', '𝔑': 'N', '𝔒': 'O', '𝔓': 'P', '𝔔': 'Q', 'ℜ': 'R', '𝔖': 'S', '𝔗': 'T', '𝔘': 'U', '𝔙': 'V', '𝔚': 'W', '𝔛': 'X', '𝔜': 'Y', 'ℨ': 'Z', '𝔞': 'a', '𝔟': 'b', '𝔠': 'c', '𝔡': 'd', '𝔢': 'e', '𝔣': 'f', '𝔤': 'g', '𝔥': 'h', '𝔦': 'i', '𝔧': 'j', '𝔨': 'k', '𝔩': 'l', '𝔪': 'm', '𝔫': 'n', '𝔬': 'o', '𝔭': 'p', '𝔮': 'q', '𝔯': 'r', '𝔰': 's', '𝔱': 't', '𝔲': 'u', '𝔳': 'v', '𝔴': 'w', '𝔵': 'x', '𝔶': 'y', '𝔷': 'z' },
        // Double Struck
        { '𝔸': 'A', '𝔹': 'B', 'ℂ': 'C', '𝔻': 'D', '𝔼': 'E', '𝔽': 'F', '𝔾': 'G', 'ℍ': 'H', '𝕀': 'I', '𝕁': 'J', '𝕂': 'K', '𝕃': 'L', '𝕄': 'M', 'ℕ': 'N', '𝕆': 'O', 'ℙ': 'P', 'ℚ': 'Q', 'ℝ': 'R', '𝕊': 'S', '𝕋': 'T', '𝕌': 'U', '𝕍': 'V', '𝕎': 'W', '𝕏': 'X', '𝕐': 'Y', 'ℤ': 'Z', '𝕒': 'a', '𝕓': 'b', '𝕔': 'c', '𝕕': 'd', '𝕖': 'e', '𝕗': 'f', '𝕘': 'g', '𝕙': 'h', '𝕚': 'i', '𝕛': 'j', '𝕜': 'k', '𝕝': 'l', '𝕞': 'm', '𝕟': 'n', '𝕠': 'o', '𝕡': 'p', '𝕢': 'q', '𝕣': 'r', '𝕤': 's', '𝕥': 't', '𝕦': 'u', '𝕧': 'v', '𝕨': 'w', '𝕩': 'x', '𝕪': 'y', '𝕫': 'z', '𝟘': '0', '𝟙': '1', '𝟚': '2', '𝟛': '3', '𝟜': '4', '𝟝': '5', '𝟞': '6', '𝟟': '7', '𝟠': '8', '𝟡': '9' },
        // Squared
        { '🄰': 'A', '🄱': 'B', '🄲': 'C', '🄳': 'D', '🄴': 'E', '🄵': 'F', '🄶': 'G', '🄷': 'H', '🄸': 'I', '🄹': 'J', '🄺': 'K', '🄻': 'L', '🄼': 'M', '🄽': 'N', '🄾': 'O', '🄿': 'P', '🅀': 'Q', '🅁': 'R', '🅂': 'S', '🅃': 'T', '🅄': 'U', '🅅': 'V', '🅆': 'W', '🅇': 'X', '🅈': 'Y', '🅉': 'Z' },
        // Bubble
        { 'Ⓐ': 'A', 'Ⓑ': 'B', 'Ⓒ': 'C', 'Ⓓ': 'D', 'Ⓔ': 'E', 'Ⓕ': 'F', 'Ⓖ': 'G', 'Ⓗ': 'H', 'Ⓘ': 'I', 'Ⓙ': 'J', 'Ⓚ': 'K', 'Ⓛ': 'L', 'Ⓜ': 'M', 'Ⓝ': 'N', 'Ⓞ': 'O', 'Ⓟ': 'P', 'Ⓠ': 'Q', 'Ⓡ': 'R', 'Ⓢ': 'S', 'Ⓣ': 'T', 'Ⓤ': 'U', 'Ⓥ': 'V', 'Ⓦ': 'W', 'Ⓧ': 'X', 'Ⓨ': 'Y', 'Ⓩ': 'Z', 'ⓐ': 'a', 'ⓑ': 'b', 'ⓒ': 'c', 'ⓓ': 'd', 'ⓔ': 'e', 'ⓕ': 'f', 'ⓖ': 'g', 'ⓗ': 'h', 'ⓘ': 'i', 'ⓙ': 'j', 'ⓚ': 'k', 'ⓛ': 'l', 'ⓜ': 'm', 'ⓝ': 'n', 'ⓞ': 'o', 'ⓟ': 'p', 'ⓠ': 'q', 'ⓡ': 'r', 'ⓢ': 's', 'ⓣ': 't', 'ⓤ': 'u', 'ⓥ': 'v', 'ⓦ': 'w', 'ⓧ': 'x', 'ⓨ': 'y', 'ⓩ': 'z', '⓪': '0', '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9' },
        // Monospace
        { '𝙰': 'A', '𝙱': 'B', '𝙲': 'C', '𝙳': 'D', '𝙴': 'E', '𝙵': 'F', '𝙶': 'G', '𝙷': 'H', '𝙸': 'I', '𝙹': 'J', '𝙺': 'K', '𝙻': 'L', '𝙼': 'M', '𝙽': 'N', '𝙾': 'O', '𝙿': 'P', '𝚀': 'Q', '𝚁': 'R', '𝚂': 'S', '𝚃': 'T', '𝚄': 'U', '𝚅': 'V', '𝚆': 'W', '𝚇': 'X', '𝚈': 'Y', '𝚉': 'Z', '𝚊': 'a', '𝚋': 'b', '𝚌': 'c', '𝚍': 'd', '𝚎': 'e', '𝚏': 'f', '𝚐': 'g', '𝚑': 'h', '𝚒': 'i', '𝚓': 'j', '𝚔': 'k', '𝚕': 'l', '𝚖': 'm', '𝚗': 'n', '𝚘': 'o', '𝚙': 'p', '𝚚': 'q', '𝚛': 'r', '𝚜': 's', '𝚝': 't', '𝚞': 'u', '𝚟': 'v', '𝚠': 'w', '𝚡': 'x', '𝚢': 'y', '𝚣': 'z' },
        // Sans Bold Italic
        { '𝘼': 'A', '𝘽': 'B', '𝘾': 'C', '𝘿': 'D', '𝙀': 'E', '𝙁': 'F', '𝙂': 'G', '𝙃': 'H', '𝙄': 'I', '𝙅': 'J', '𝙆': 'K', '𝙇': 'L', '𝙈': 'M', '𝙉': 'N', '𝙊': 'O', '𝙋': 'P', '𝙌': 'Q', '𝙍': 'R', '𝙎': 'S', '𝙏': 'T', '𝙐': 'U', '𝙑': 'V', '𝙒': 'W', '𝙓': 'X', '𝙔': 'Y', '𝙕': 'Z', '𝙖': 'a', '𝙗': 'b', '𝙘': 'c', '𝙙': 'd', '𝙚': 'e', '𝙛': 'f', '𝙜': 'g', '𝙝': 'h', '𝙞': 'i', '𝙟': 'j', '𝙠': 'k', '𝙡': 'l', '𝙢': 'm', '𝙣': 'n', '𝙤': 'o', '𝙥': 'p', '𝙦': 'q', '𝙧': 'r', '𝙨': 's', '𝙩': 't', '𝙪': 'u', '𝙫': 'v', '𝙬': 'w', '𝙭': 'x', '𝙮': 'y', '𝙯': 'z' },
        // Sans Bold
        { '𝗔': 'A', '𝗕': 'B', '𝗖': 'C', '𝗗': 'D', '𝗘': 'E', '𝗙': 'F', '𝗚': 'G', '𝗛': 'H', '𝗜': 'I', '𝗝': 'J', '𝗞': 'K', '𝗟': 'L', '𝗠': 'M', '𝗡': 'N', '𝗢': 'O', '𝗣': 'P', '𝗤': 'Q', '𝗥': 'R', '𝗦': 'S', '𝗧': 'T', '𝗨': 'U', '𝗩': 'V', '𝗪': 'W', '𝗫': 'X', '𝗬': 'Y', '𝗭': 'Z', '𝗮': 'a', '𝗯': 'b', '𝗰': 'c', '𝗱': 'd', '𝗲': 'e', '𝗳': 'f', '𝗴': 'g', '𝗵': 'h', '𝗶': 'i', '𝗷': 'j', '𝗸': 'k', '𝗹': 'l', '𝗺': 'm', '𝗻': 'n', '𝗼': 'o', '𝗽': 'p', '𝗾': 'q', '𝗿': 'r', '𝘀': 's', '𝘁': 't', '𝘂': 'u', '𝘃': 'v', '𝘄': 'w', '𝘅': 'x', '𝘆': 'y', '𝘇': 'z' },
        // Sans Italic
        { '𝘈': 'A', '𝘉': 'B', '𝘊': 'C', '𝘋': 'D', '𝘌': 'E', '𝘍': 'F', '𝘎': 'G', '𝘏': 'H', '𝘐': 'I', '𝘑': 'J', '𝘒': 'K', '𝘓': 'L', '𝘔': 'M', '𝘕': 'N', '𝘖': 'O', '𝘗': 'P', '𝘘': 'Q', '𝘙': 'R', '𝘚': 'S', '𝘛': 'T', '𝘜': 'U', '𝘝': 'V', '𝘞': 'W', '𝘟': 'X', '𝘠': 'Y', '𝘡': 'Z', '𝘢': 'a', '𝘣': 'b', '𝘤': 'c', '𝘥': 'd', '𝘦': 'e', '𝘧': 'f', '𝘨': 'g', '𝘩': 'h', '𝘪': 'i', '𝘫': 'j', '𝘬': 'k', '𝘭': 'l', '𝘮': 'm', '𝘯': 'n', '𝘰': 'o', '𝘱': 'p', '𝘲': 'q', '𝘳': 'r', '𝘴': 's', '𝘵': 't', '𝘶': 'u', '𝘷': 'v', '𝘸': 'w', '𝘹': 'x', '𝘺': 'y', '𝘻': 'z' },
        // Serif Bold Italic
        { '𝑨': 'A', '𝑩': 'B', '𝑪': 'C', '𝑫': 'D', '𝑬': 'E', '𝑭': 'F', '𝑮': 'G', '𝑯': 'H', '𝑰': 'I', '𝑱': 'J', '𝑲': 'K', '𝑳': 'L', '𝑴': 'M', '𝑵': 'N', '𝑶': 'O', '𝑷': 'P', '𝑸': 'Q', '𝑹': 'R', '𝑺': 'S', '𝑻': 'T', '𝑼': 'U', '𝑽': 'V', '𝑾': 'W', '𝑿': 'X', '𝒀': 'Y', '𝒁': 'Z', '𝒂': 'a', '𝒃': 'b', '𝒄': 'c', '𝒅': 'd', '𝒆': 'e', '𝒇': 'f', '𝒈': 'g', '𝒉': 'h', '𝒊': 'i', '𝒋': 'j', '𝒌': 'k', '𝒍': 'l', '𝒎': 'm', '𝒏': 'n', '𝒐': 'o', '𝒑': 'p', '𝒒': 'q', '𝒓': 'r', '𝒔': 's', '𝒕': 't', '𝒖': 'u', '𝒗': 'v', '𝒘': 'w', '𝒙': 'x', '𝒚': 'y', '𝒛': 'z' },
        // Serif Bold
        { '𝐀': 'A', '𝐁': 'B', '𝐂': 'C', '𝐃': 'D', '𝐄': 'E', '𝐅': 'F', '𝐆': 'G', '𝐇': 'H', '𝐈': 'I', '𝐉': 'J', '𝐊': 'K', '𝐋': 'L', '𝐌': 'M', '𝐍': 'N', '𝐎': 'O', '𝐏': 'P', '𝐐': 'Q', '𝐑': 'R', '𝐒': 'S', '𝐓': 'T', '𝐔': 'U', '𝐕': 'V', '𝐖': 'W', '𝐗': 'X', '𝐘': 'Y', '𝐙': 'Z', '𝐚': 'a', '𝐛': 'b', '𝐜': 'c', '𝐝': 'd', '𝐞': 'e', '𝐟': 'f', '𝐠': 'g', '𝐡': 'h', '𝐢': 'i', '𝐣': 'j', '𝐤': 'k', '𝐥': 'l', '𝐦': 'm', '𝐧': 'n', '𝐨': 'o', '𝐩': 'p', '𝐪': 'q', '𝐫': 'r', '𝐬': 's', '𝐭': 't', '𝐮': 'u', '𝐯': 'v', '𝐰': 'w', '𝐱': 'x', '𝐲': 'y', '𝐳': 'z' },
        // Serif Italic
        { '𝐴': 'A', '𝐵': 'B', '𝐶': 'C', '𝐷': 'D', '𝐸': 'E', '𝐹': 'F', '𝐺': 'G', '𝐻': 'H', '𝐼': 'I', '𝐽': 'J', '𝐾': 'K', '𝐿': 'L', '𝑀': 'M', '𝑁': 'N', '𝑂': 'O', '𝑃': 'P', '𝑄': 'Q', '𝑅': 'R', '𝑆': 'S', '𝑇': 'T', '𝑈': 'U', '𝑉': 'V', '𝑊': 'W', '𝑋': 'X', '𝑌': 'Y', '𝑍': 'Z', '𝑎': 'a', '𝑏': 'b', '𝑐': 'c', '𝑑': 'd', '𝑒': 'e', '𝑓': 'f', '𝑔': 'g', 'ℎ': 'h', '𝑖': 'i', '𝑗': 'j', '𝑘': 'k', '𝑙': 'l', '𝑚': 'm', '𝑛': 'n', '𝑜': 'o', '𝑝': 'p', '𝑞': 'q', '𝑟': 'r', '𝑠': 's', '𝑡': 't', '𝑢': 'u', '𝑣': 'v', '𝑤': 'w', '𝑥': 'x', '𝑦': 'y', '𝑧': 'z' }
    ];
    
    // Merge all maps into reverseMap
    allMaps.forEach(map => {
        Object.assign(reverseMap, map);
    });
    
    // Use Array.from to properly handle Unicode characters (including surrogate pairs)
    return Array.from(text).map(char => {
        // Check if it's in our reverse map
        if (reverseMap[char]) {
            return reverseMap[char];
        }
        
        // Handle fullwidth characters
        const code = char.codePointAt(0);
        if (code && code >= 65281 && code <= 65374) {
            return String.fromCodePoint(code - 65248);
        }
        
        return char;
    }).join('');
};

// Cursive Styles
const toScriptBold = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
        'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃'
    };
    return mapChars(text, map);
};

const toScript = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
        'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏'
    };
    return mapChars(text, map);
};

const toGothicBold = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅',
        'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟'
    };
    return mapChars(text, map);
};

const toGothic = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ',
        'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷'
    };
    return mapChars(text, map);
};

const toDoubleStruck = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
        'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
        '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
    };
    return mapChars(text, map);
};



const toFullwidth = (text: string) => {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 33 && code <= 126) {
            return String.fromCharCode(code + 65248);
        }
        return char;
    }).join('');
};

const toSquared = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶', 'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉',
        'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉'
    };
    return mapChars(text, map);
};

const toBubble = (text: string) => {
    const map: { [key: string]: string } = {
        'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
        'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
        '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
    };
    return mapChars(text, map);
};

const toMonospace = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return mapChars(text, map);
};

// Additional Unicode variants
const toSansBoldItalic = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕',
        'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯'
    };
    return mapChars(text, map);
};

const toSansBold = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇'
    };
    return mapChars(text, map);
};

const toSansItalic = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
    };
    return mapChars(text, map);
};

const toSerifBoldItalic = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
        'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛'
    };
    return mapChars(text, map);
};

const toSerifBold = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳'
    };
    return mapChars(text, map);
};

const toSerifItalic = (text: string) => {
    const map: { [key: string]: string } = {
        'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
        'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧'
    };
    return mapChars(text, map);
};


// Base font arrays
const unicodeFonts: FontItem[] = [
    // Top requested styles
    { name: 'Script Bold', mode: 'unicode', transform: toScriptBold },
    { name: 'Script', mode: 'unicode', transform: toScript },
    { name: 'Double Struck', mode: 'unicode', transform: toDoubleStruck },
    { name: 'Fraktur', mode: 'unicode', transform: toGothic },

    // Other Script/Cursive styles
    { name: 'Fraktur Bold', mode: 'unicode', transform: toGothicBold },

    // Math/Serif styles
    { name: 'Math Serif Bold Italic', mode: 'unicode', transform: toSerifBoldItalic },
    { name: 'Math Serif Bold', mode: 'unicode', transform: toSerifBold },
    { name: 'Math Serif Italic', mode: 'unicode', transform: toSerifItalic },

    // Sans styles
    { name: 'Math Sans Bold Italic', mode: 'unicode', transform: toSansBoldItalic },
    { name: 'Math Sans Bold', mode: 'unicode', transform: toSansBold },
    { name: 'Math Sans Italic', mode: 'unicode', transform: toSansItalic },

    // Special styles
    { name: 'Monospace', mode: 'unicode', transform: toMonospace },
    { name: 'Fullwidth', mode: 'unicode', transform: toFullwidth },
    { name: 'Squared', mode: 'unicode', transform: toSquared },
    { name: 'Bubble', mode: 'unicode', transform: toBubble },
];



const CursiveGenerator = () => {
    const [text, setText] = useState('');
    const placeholderText = 'Type your text here...';
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleCopy = (font: FontItem) => {
        const displayText = text || placeholderText;
        let transformedText = displayText;

        // Apply font transformation
        if (font.mode === 'unicode' && font.transform) {
            transformedText = font.transform(displayText);
        }

        navigator.clipboard.writeText(transformedText);
        setToastMessage('Copied to clipboard!');
        setShowToast(true);
    };

    return (
        <div className="flex gap-8 mx-4 md:flex-row flex-col lg:mx-6 xl:mx-8">
            <div className="w-full md:w-2/5 min-w-0 p-2 md:p-4 md:pr-6">
                <div className="sticky top-20 flex flex-col gap-6 z-10">
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">Your Text</h2>

                    <textarea
                        className="w-full h-[150px] sm:h-[175px] p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-border bg-transparent text-foreground text-[1rem] sm:text-[1.2rem] leading-[1.5] resize-none transition-all shadow-none hover:border-blue-500 hover:shadow-[0_4px_12px_rgba(59,130,246,0.15)] focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.2)] focus:bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        style={{ 
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                            fontStyle: 'normal'
                        }}
                        value={text}
                        onChange={(e) => {
                            const inputText = e.target.value;
                            const normalizedText = toNormalText(inputText);
                            setText(normalizedText);
                        }}
                        onPaste={(e) => {
                            e.preventDefault();
                            const pastedText = e.clipboardData.getData('text/plain');
                            const normalizedText = toNormalText(pastedText);
                            
                            const textarea = e.currentTarget;
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const currentText = textarea.value;
                            
                            // Insert normalized text at cursor position
                            const newText = currentText.substring(0, start) + normalizedText + currentText.substring(end);
                            setText(newText);
                            
                            // Set cursor position after inserted text
                            setTimeout(() => {
                                textarea.selectionStart = textarea.selectionEnd = start + normalizedText.length;
                            }, 0);
                        }}
                        placeholder={placeholderText}
                    />
                </div>
            </div>

            <div className="w-full md:w-3/5 min-w-0 p-2 md:p-4 md:pl-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground">Cursive ({unicodeFonts.length})</h2>
                        <span className="text-xs sm:text-sm text-text-secondary font-normal">
                            Click to copy
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    {unicodeFonts.map((font) => {
                        const displayText = text || placeholderText;

                        // Apply font transformation
                        let transformedText = displayText;
                        if (font.mode === 'unicode' && font.transform) {
                            transformedText = font.transform(displayText);
                        }

                        return (
                            <div
                                key={font.name}
                                className="font-item-hover cursor-pointer flex flex-col gap-1 py-3 px-4 border-b border-gray-200 dark:border-gray-700 rounded-lg last:border-b-0 group"
                                onClick={() => handleCopy(font)}
                                role="button"
                                tabIndex={0}
                            >
                                <div
                                    className="text-[1.4rem] sm:text-[1.8rem] leading-[1.5] text-foreground word-break-break-word whitespace-pre-wrap overflow-wrap-break-word hyphens-auto"
                                >
                                    {transformedText}
                                </div>
                                <div className="text-[0.7rem] sm:text-[0.75rem] text-text-secondary uppercase tracking-[0.05em] font-medium transition-colors duration-200 group-hover:text-blue-600">
                                    {font.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default CursiveGenerator;
