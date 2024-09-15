const frame = () => new Promise(res=>setTimeout(res,app.wait))
const algo = {
    async Bubble(){
        let arr = ORGarr
        let solved = false
        let si = 0
        while(true){
            for(let i = 0;i <= arr.length - si;i++){
                app.hi = [i,i+1]
                if(arr[i] > arr[i+1]){
                    let t = arr[i+1]
                    arr[i+1] = arr[i]
                    arr[i] = t
                }
                app.arr = arr
                await frame()
            }
            si++
            solved = true
            for(let i = 0;i < arr.length;i++){
                if(!solved || arr[i] > arr[i+1]){
                    solved = false;
                }
            }
            if(solved) return;
        }
    },
    async Shaker(){
        let arr = ORGarr
        let solved = false
        let si = 0
        while(true){
            for(let i = si;i <= arr.length - si;i++){
                app.hi = [i,i+1]
                if(arr[i] > arr[i+1]){
                    let t = arr[i+1]
                    arr[i+1] = arr[i]
                    arr[i] = t
                }
                app.arr = arr
                await frame()
            }
            for(let i = arr.length -si-1;i >= si;i--){
                app.hi = [i,i+1]
                if(arr[i] > arr[i+1]){
                    let t = arr[i+1]
                    arr[i+1] = arr[i]
                    arr[i] = t
                }
                app.arr = arr
                await frame()
            }
            si++
            solved = true
            for(let i = 0;i < arr.length;i++){
                if(!solved || arr[i] > arr[i+1]){
                    solved = false;
                }
            }
            if(solved) return;
        }
    },
    async Insertion()
    {
        let arr = ORGarr
        let n = ORGarr.length;
        let i, key, j;
        for (i = 1; i < n; i++)
        {
            key = arr[i];
            j = i - 1;
    
            while (j >= 0 && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j = j - 1;
                app.arr = arr;
                await frame()
            }
            arr[j + 1] = key;
        }
    },
    async Selection(){
        let arr = ORGarr
        for(let i = 0;i < arr.length;i++){
            let min = i
            for(let j = i+1;j < arr.length;j++){
                app.hi = [i,min,j]
                if(arr[min] >= arr[j]){
                    min = j
                }
                await frame()
            }
            let t = arr[i]
            arr[i] = arr[min]
            arr[min] = t
            app.arr = arr
        }
    },
    async Gnome(){
        let arr = ORGarr
        async function moveBack(i) {
            for( ; i > 0 && arr[i-1] > arr[i]; i--) {
                var t = arr[i];
                arr[i] = arr[i-1];
                arr[i-1] = t;
                app.arr = arr;
                await frame()
            }
        }
        for (var i = 1; i < arr.length; i++) {
            if (arr[i-1] > arr[i])await moveBack(i);
        }
    },
    async LLQuick(){
        let arr = ORGarr;
        let stack = [[0, arr.length - 1]];
        const part = async(low, high)=>{
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                app.hi = [j,low,high]
                if (arr[j] <= pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    app.arr = arr;
                }
                await frame();
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }
        while (stack.length) {
            let [start, end] = stack.pop();
            if (start < end) {
                let p = await part(start, end);
                stack.push([p + 1, end]);
                stack.push([start, p - 1]);
            }
        }
    },
    async LRQuick(){
        let arr = ORGarr;
        let stack = [[0, arr.length - 1]];
        const part = async(low, high)=>{
            let pivot = arr[high];
            let left = low;
            let right = high
            while(true){
                while(arr[left] < pivot) left++
                while(pivot < arr[right])right--
                app.hi = [left,right,low,high]
                if(right <= left){
                    break;
                }
                [arr[left],arr[right]] = [arr[right],arr[left]]
                left++
                right--
                app.arr = arr
                await frame()
            }
            
            return [left,right]
        }
        while (stack.length) {
            let [start, end] = stack.pop();
            let p = await part(start, end);
            if (p[1] < end) {
                stack.push([p[1]+1,end]);
            }
            if (start < p[0]-1) {
                stack.push([start, p[0] - 1]);
            }
        }
    },
    async Shell(){
        let arr = ORGarr
        let n = arr.length;
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
            for (let i = gap; i < n; i += 1)  {
                let temp = arr[i];
    
                let j;
                for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
                    arr[j] = arr[j-gap];
                    app.arr = arr;
                    await frame()
                }
                arr[j] = temp;
            }
        }
        return arr;
    },
    async Comb(){
        let arr = ORGarr
        let length = arr.length;
        let shrink = 1.3;
        let gap = length;
        let sorted = false;
    
        while (!sorted) {
            gap = parseInt(gap/shrink);
            if (gap <= 1) {
                sorted = true;
                gap = 1;
            }
    
            for (let i = 0; i < length-gap; i++) {
                let sm = gap + i;
                if (arr[i] > arr[sm]) {
                    [arr[i], arr[sm]] = [arr[sm], arr[i]]
                    app.arr = arr
                    await frame()
                    sorted = false;
                }
            }
        }
    },
    async Heap() {
        let array = ORGarr
        let size = array.length
        async function heapify(size, i) {
            let max = i
            let left = 2 * i + 1
            let right = 2 * i + 2
          
            if (left < size && array[left] > array[max])
                max = left
          
            if (right < size && array[right] > array[max])
                max = right
            app.arr = array;
            await frame()
            if (max != i) {
                let temp = array[i]
                array[i] = array[max]
                array[max] = temp
          
                await heapify(size, max)
            }
        }
      
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
            await heapify(size, i)
      
        for (let i = size - 1; i >= 0; i--) {
            let temp = array[0]
            array[0] = array[i]
            array[i] = temp
            app.arr = array;
            await frame()
            await heapify(i, 0)
        }
    },
    async Quick_fast_(){
        let arr = ORGarr;
        let stack = [[0, arr.length - 1]];
        const part = async(low, high)=>{
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                app.hi = [j,low,high]
                if (arr[j] <= pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    app.arr = arr;
                }
            }
            await frame();
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }
        while (stack.length) {
            let [start, end] = stack.pop();
            if (start < end) {
                let p = await part(start, end);
                stack.push([p + 1, end]);
                stack.push([start, p - 1]);
            }
        }
    },
    async Scramble(){
        let arr = ORGarr
        let scr = []
        for(let i = 0;i < arr.length;i++) scr.push(i)
        while(scr.length != 0){
            let i = scr[Math.floor(Math.random() * (scr.length - 1))]
            scr.splice(scr.indexOf(i),1)
            let j = scr[Math.floor(Math.random() * (scr.length - 1))]
            scr.splice(scr.indexOf(j),1)

            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
            app.arr = arr
            console.log(scr)
            await frame();
        }
    }
}
let ORGarr = []
const app = Vue.createApp({
    data(){
        return {
            text:`Let's sort Text! with TextSorter by TNTSuperMan.`,
            sorting:false,
            algokeys:Object.keys(algo),
            selectalgo:"",
            debug:[],
            sarr:[],
            diff:[],
            hi:[],
            wait:0,
            insorted:false
        }
    },
    computed:{
        arr:{
            get:()=>ORGarr.map(e=>e),
            set(t){
                if(app.sorting){
                    app.sarr = t.map(e=>String.fromCodePoint(e))
                    app.diff = ORGarr.map((e,i)=>e != t[i])
                }
                ORGarr = t.map(e=>e)
                return t
            }
        }
    },
    methods:{
        start(){
            if((app.insorted||!app.sorting)&&Object.keys(algo).some(e=>app.selectalgo==e)){
                app.insorted = false
                ORGarr = app.text.split("").map(e=>e.codePointAt())
                app.sarr = app.text.split("")
                app.diff = new Array(app.text.length)
                app.sorting = true
                algo[app.selectalgo]().finally(()=>{
                    app.diff = []
                    app.hi = []
                    app.insorted = true
                })
                
            }
        },
        end(){
            app.sorting = false
        }
    }
}).mount("#app")