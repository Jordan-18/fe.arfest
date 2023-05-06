<template>
    <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true" :data-bs-backdrop="backdrop ? 'static' : null">
        <div class="modal-dialog" :class="modalSize">
            <div class="modal-content">
                <div class="modal-header py-7 d-flex justify-content-between">
                    <h2>{{ title }}</h2>
                    <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        <span class="svg-icon svg-icon-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    props:{
        id:String,
        title: String,
        backdrop: String,
        size:String,
        component: String,
    },
    data () {
      return {
        modalSize: ''
      }
    },
    mounted(){
        this.index()
    },
    methods:{
        index(){
            let size = this.$props.size
            if(size == 'basic'){
                this.modalSize = '' 
            }
            else if(size == 'small'){
                this.modalSize = 'modal-sm' 
            }
            else if(size == 'large'){
                this.modalSize = 'modal-lg' 
            }
            else if(size == 'xlarge'){
                this.modalSize = 'modal-xl' 
            }
            else if(size == 'fullscreen'){
                this.modalSize = 'modal-fullscreen' 
            }
            else{
                this.modalSize = 'mw-1000px'
            }
        }
    }
  }
</script>