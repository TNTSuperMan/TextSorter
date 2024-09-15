<script setup>
import Sort from "./sort"
import { ref, watch } from "vue"

const sortName = ref("")
const text = ref("")
const interval = ref(0)
const isEnable = ref(true)

watch(interval,e=>{
    window.t = e
})
function sort(){
    console.log(sortName.value)
    if(Sort[sortName.value]){
        console.log("a")
        isEnable = false
        Sort[sortName.value]().then(()=>isEnable = true)
    }
}
</script>
<template>
    <div class="root">
        <div class="text">
            <textarea name="content" class="sorttext" v-model="text"></textarea>
        </div>
        <div class="sort">
            Interval:
            <select name="interval" v-model.number="interval">
                <option value="0">0ms</option>
                <option value="10">10ms</option>
                <option value="50">50ms</option>
                <option value="100">100ms</option>
                <option value="500">500ms</option>
                <option value="1000">1000ms</option>
            </select><br>
            <select name="sort" v-model="sortName" size="15" :disabled="!isEnable">
                <option value="" v-for="name in Object.keys(Sort)" :value="name">{{ name }}Sort</option>
            </select><br>
            <button @click="sort">Sort</button>
        </div>
    </div>
</template>
<style scoped>
.root{
    background:black;
    color:white;
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
}
.text{
    position:fixed;
    left:0;
    top:0;
    width:70%;
    height:100%;
    padding:20px;
}
.sort{
    position:fixed;
    left:70%;
    top:0;
    width:30%;
    height:100%;
    padding:20px;
}

select[name=sort]{
    width:calc(100% - 30px);
    background:black;
    color:white;
    text-align:center;
    padding:5px;
    border:none;
    outline:none;
    font-size:15px;
}
select[name=sort]>option{
    background:#222;
    padding:5px;
    margin:5px;
    border-radius: 5px;
}
select[name=interval]{
    background:black;
    color:white;
}

.sorttext{
    background:black;
    color:white;
    padding:10px;
    border:1px white solid;
    border-radius: 10px;
    width:calc(100% - 30px);
    height:calc(90% - 30px);
    font-size:15px;
}
textarea{
    resize:none;
}

button{
    font-size:20px;
    background:black;
    color:white;
    border:1px white solid;
    padding:7px;
    border-radius: 10px;
}
</style>
