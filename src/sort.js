function frame(){
    return new window.Promise(res=>{
        setTimeout(res,window.t)
    })
}
export default {
    async Bubble(arr){
        let solved = false
        let si = 0
        while(true){
            for(let i = 0;i <= arr.length - si;i++){
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
    async Shaker(arr){
        let solved = false
        let si = 0
        while(true){
            for(let i = si;i <= arr.length - si;i++){
                if(arr[i] > arr[i+1]){
                    let t = arr[i+1]
                    arr[i+1] = arr[i]
                    arr[i] = t
                }
                app.arr = arr
                await frame()
            }
            for(let i = arr.length -si-1;i >= si;i--){
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
    async Insertion(arr)
    {
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
    async Selection(arr){
        for(let i = 0;i < arr.length;i++){
            let min = i
            for(let j = i+1;j < arr.length;j++){
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
    async Gnome(arr){
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
    async LLQuick(arr){
        let stack = [[0, arr.length - 1]];
        const part = async(low, high)=>{
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
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
    async LRQuick(arr){
        let stack = [[0, arr.length - 1]];
        const part = async(low, high)=>{
            let pivot = arr[high];
            let left = low;
            let right = high
            while(true){
                while(arr[left] < pivot) left++
                while(pivot < arr[right])right--
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
    async Shell(arr){
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
    async Comb(arr){
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
    async Heap(arr) {
        let size = array.length
        async function heapify(size, i) {
            let max = i
            let left = 2 * i + 1
            let right = 2 * i + 2
          
            if (left < size && arr[left] > arr[max])
                max = left
          
            if (right < size && arr[right] > arr[max])
                max = right
            await frame()
            if (max != i) {
                let temp = arr[i]
                arr[i] = arr[max]
                arr[max] = temp
          
                await heapify(size, max)
            }
        }
      
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
            await heapify(size, i)
      
        for (let i = size - 1; i >= 0; i--) {
            let temp = arr[0]
            arr[0] = arr[i]
            arr[i] = temp
            app.arr = arr;
            await frame()
            await heapify(i, 0)
        }
    }
}