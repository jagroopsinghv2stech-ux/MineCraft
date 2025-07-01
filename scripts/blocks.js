import * as THREE from 'three'


const textureLoader=new THREE.TextureLoader();

function loadTexture(path){
    const texture=textureLoader.load(path)
    texture.colorSpace=THREE.SRGBColorSpace;
    texture.minFilter=THREE.NearestFilter;
    texture.magFilter=THREE.NearestFilter;
    return texture
}

const textures={
    dirt:loadTexture('textures/dirt.png'),
    stone:loadTexture('textures/stone.png'),
    grass:loadTexture('textures/grass.png'),
    grass_side:loadTexture('textures/grass_side.png'),
    coalOre:loadTexture('textures/coal_ore.png'),
    ironOre:loadTexture('textures/iron_ore.png'),

}

export const blocks = {
  empty: {
    id: 0
  },
  grass: {
    id: 1,
    name: 'grass',
    color: 0x559020,
    material:[
        new THREE.MeshLambertMaterial({map:textures.grass_side}), //rightside
        new THREE.MeshLambertMaterial({map:textures.grass_side}),//leftside
        new THREE.MeshLambertMaterial({map:textures.grass}),//top
        new THREE.MeshLambertMaterial({map:textures.dirt}),//bottom
        new THREE.MeshLambertMaterial({map:textures.grass_side}),//front
        new THREE.MeshLambertMaterial({map:textures.grass_side}),//back
    ]
  },
  dirt: {
    id: 2,
    name: 'dirt',
    color: 0x807020,
    material:new THREE.MeshLambertMaterial({map:textures.dirt})
  },
  stone:{
    id:3,
    name:'stone',
    color:0x808080,
    material:new THREE.MeshLambertMaterial({map:textures.stone}),
    scale:{x:30,y:30,z:30},
    scarcity:0.5
  },
  ironOre:{
    id:4,
    name:'ironore',
    color:0x806060,
     material:new THREE.MeshLambertMaterial({map:textures.ironOre}),
    scale:{x:20,y:20,z:20},
    scarcity:0.9
  }
  ,
  coalOre:{
     id:5,
    name:'coalOre',
    color:0x202020,
     material:new THREE.MeshLambertMaterial({map:textures.coalOre}),
    scale:{x:60,y:60,z:60},
    scarcity:0.8
  }
};

export const resources=[
    blocks.stone,
    blocks.coalOre,
    blocks.ironOre
]