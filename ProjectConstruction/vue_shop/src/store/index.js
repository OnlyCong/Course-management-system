import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);



export default new vuex.Store({
    //相当于组件中的data
    state:{
        num:0
    },
    mutations:{
        updateData1(state){
            state.num==state.num
        },
        updateData2(state){
            state.num++
        }
    }

})