<script setup>
    import Datatable from '@/components/Material/Datatable.vue'
</script>
<template>
    <!-- Table -->
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content" v-if="!toogle">
        <div class="container-fluid" id="kt_content_container">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-12">
                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bold fs-3 mb-1">Point</span>
                                <span class="text-muted fw-semibold fs-7">Point &raquo;</span>
                            </h3>
                            <div class="card-toolbar">
                                <v-btn class="info" variant="tonal" color="info" 
                                    @click="() => {
                                        this.breadcrump = 'Create'
                                        this.onSubmit = this.create
                                        this.onSubmitColor = 'green'
                                        this.textSubmit = 'Submit'
                                        
                                        this.Point = []
                                        this.pointsData.jarak = ''
                                        this.pointsData.jenis_busur = ''
                                        this.pointsData.rambahan = ''
                                        this.targetAllResult = []

                                        this.toogleForm()
                                    }"
                                >
                                    <i class="bi bi-plus-circle"></i>
                                    Start Shooting
                                </v-btn>
                            </div>
                        </div>
                        <div class="card-body py-3"></div>
                    </div>
                </div>
                
                <div class="row flex-nowrap overflow-auto" @scroll="infinyScroll" style="height: 300px;" :loading="isLoading">
                    <div class="col-md-3" v-for="(v,i) in indexPoint" :key="index">
                        <div class="card mt-3">
                            <div class="card-body">
                                <h5 class="card-title">{{v.point_tanggal}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{{ v.jenis_busur_name }}</h6>
                                <!-- <p class="card-text"></p> -->
                                <v-table>
                                    <tr>
                                        <td>Jarak</td>
                                        <td>:</td>
                                        <td>{{ v.point_jarak }}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>:</td>
                                        <td>{{ v.point_total+" / "+((v.point_jumlah_anak_panah * 10) * v.point_rambahan) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Presentase</td>
                                        <td>:</td>
                                        <td>{{ v.point_presentase+" %" }}</td>
                                    </tr>
                                </v-table>
                                <br>
                                <div class="row">
                                    <v-btn 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modalDetail"
                                        justify='end' 
                                        color="success"
                                        fab dark small
                                        variant="tonal"
                                        @click="show(v)"
                                    >Detail &raquo;</v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <v-progress-circular 
                        v-if="isLoading" 
                        justify='end' 
                        style=""
                        indeterminate 
                        color="primary"
                    ></v-progress-circular>
                </div>

            </div>
        </div>
    </div>

    <!-- Form -->
    <div class="content d-flex flex-column flex-column-fluid" v-if="toogle">
        <div class="container-fluid">
            <div class="row g-5 g-xl-8">
                <div class="col-xl-12">
                    <div class="card card-xl-stretch mb-xl-8">
                        <div class="card-header border-0 pt-5">
                            <div class="card-toolbar">
                                <v-btn class="light " variant="tonal" color="light"  @click="toogleForm">
                                    <i class="bi bi-arrow-bar-left" style="color: black;"></i>
                                </v-btn>
                                <h3 class="card-title align-items-start flex-column">
                                    <span class="card-label fw-bold fs-3 mb-1">Point</span>
                                    <span class="text-muted fw-semibold fs-7">Point &raquo; {{ breadcrump }}</span>
                                </h3>
                            </div>
                        </div>
                        <div class="card-body py-3"></div>
                    </div>
                </div>

                <div class="row flex-nowrap overflow-auto">
                    <Form
                        formId="PointForm"
                        @submit.prevent="onSubmit"
                    >
                    <div class="row flex-nowrap overflow-auto mt-3" ref="pointScroll" style="height: 700px;">
                        <div class="col-md-3">
                            <div class="card card-xl-stretch">
                                <div class="card-body">
                                    <Label title="Jarak Menembah"/>
                                    <Number
                                        id="point_jarak"
                                        placeholder="Jumlah jarak"
                                        v-model="pointsData.jarak"
                                        @input="(event) => {
                                            pointsData.jarak = event.target.value
                                        }"
                                    />

                                    <Label class="mt-3" title="Jumlah Rambahan"/>
                                    <Select1
                                        id="select-point_rambahan"
                                        placeholder="Jumlah Rambahan"
                                        :items="ap_rambahan"
                                        @change="(event) => {
                                            pointsData.rambahan = parseInt(event)
                                        }"
                                        
                                    />
                                    <Label class="mt-3" title="Jumlah Anak Panah"/>
                                    <Select1
                                        id="select-point_jumlah_anak_panah"
                                        placeholder="Jumlah Anak Panah"
                                        :items="ap_rambahan"
                                        @change="(event) => {
                                            pointsData.jumlah_anakPanah = parseInt(event)
                                            pointsData.rowAnakPanah = Math.ceil(parseInt(event) / 6)
                                        }"
                                    />
                                    <Label class="mt-3" title="Busur"/>
                                    <Select1
                                        id="select-point_jenis_busur"
                                        placeholder="Jenis Busur"
                                        :items="selectJenis"
                                        @change="scrollRight"
                                        v-on:change="(event) => {
                                            this.selectJenis.forEach(item => {
                                                if(item.value == event){
                                                    result = item.text
                                                }
                                            });
                                            
                                            pointsData.jenis_busur = result
                                        }"
                                    />

                                    
                                    <Hidden 
                                        id="point_user"
                                        :value="pointsData.user_id"
                                        v-model="pointsData.user_id"
                                    />
                                    <Hidden 
                                        id="point_tanggal"
                                        :value="pointsData.tanggal"
                                        v-model="pointsData.tanggal"
                                    />

                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-9">
                            <div class="card card-xl-stretch">
                                <div class="card-body">
                                    <v-table fixed-header>
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Jarak</th>
                                                <th>Tanggal</th>
                                                <th>Jenis Busur</th>
                                                <th>Rambahan</th>
                                            </tr>
                                            <tr>
                                                <th>{{ pointsData.nama }}</th>
                                                <th>{{ pointsData.jarak }}</th>
                                                <th>{{ pointsData.tanggal }}</th>
                                                <th>{{ pointsData.jenis_busur}}</th>
                                                <th>{{ pointsData.rambahan }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr 
                                                v-for="i1 in (pointsData.rambahan ? pointsData.rambahan : 0)"
                                                :key="i1"
                                            >
                                                <td>{{ i1 }}</td>
                                                <td>
                                                    <v-table>
                                                        <template v-for="i2 in (pointsData.rowAnakPanah ?? 0)">
                                                            <tr>
                                                            <template v-for="i3 in 6">
                                                                <template v-if="(i2 - 1) * 6 + i3 <= (pointsData.jumlah_anakPanah ?? 0)">
                                                                    <td>
                                                                        <template v-if="targetAllResult[i1-1] ? (targetAllResult[i1-1].pointResult).length > 0 : 0">
                                                                            <template v-if="i2 == 1">
                                                                                {{ targetAllResult[i1-1].pointResult[i3-1] }}
                                                                            </template>
                                                                            <template v-else>
                                                                                {{ targetAllResult[i1-1].pointResult[(i3+6)-1] }}
                                                                            </template>
                                                                        </template>
                                                                    </td>
                                                                </template>
                                                            </template>
                                                            </tr>
                                                        </template>
                                                    </v-table>
                                                </td>
                                                <td>
                                                    <tr v-for="i2 in (pointsData.rowAnakPanah ?? 0)">
                                                        <template v-if="targetAllResult[i1-1] ? (targetAllResult[i1-1].pointResult).length > 0 : 0">
                                                            <td>
                                                                <template v-if="i2 == 1">
                                                                    {{ targetAllResult[i1-1].pointResult.slice(0, 6).reduce((acc, num) => acc + num, 0) }}
                                                                </template>
                                                                <template v-else>
                                                                    {{ targetAllResult[i1-1].pointResult.slice(6).reduce((acc, num) => acc + num, 0) }}
                                                                </template>
                                                            </td>
                                                        </template>
                                                    </tr>
                                                </td>
                                                <td>
                                                    <template v-if="targetAllResult[i1-1] ? (targetAllResult[i1-1].pointResult).length > 0 : 0">
                                                        {{ targetAllResult[i1-1].pointResult.reduce((acc, num) => acc + num, 0) }}
                                                    </template>
                                                </td>
                                                <td>
                                                    <template v-if="targetAllResult[i1-1] ? (targetAllResult[i1-1].pointResult).length > 0 : 0">
                                                        <a 
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#modalTarget"
                                                            @click="detailTarget(targetAllResult[i1-1].imgData)"
                                                        >
                                                            <img :src="targetAllResult[i1-1].imgData" style="height: 100%;">
                                                        </a>
                                                    </template>
                                                    <template v-else>
                                                        <v-btn
                                                            color="info"
                                                            fab dark small 
                                                            variant="tonal" 
                                                            data-bs-toggle="modal" 
                                                            data-bs-target="#modalPoint"
                                                            @click="() => {
                                                                this.targetResult = {
                                                                    markers: [],
                                                                    pointResult: []
                                                                }
                                                            }"
                                                        >
                                                            Add Point
                                                        </v-btn>
                                                    </template>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-table>
            
                                    <v-row justify='end' class="mt-5 mb-5">
                                        <v-btn 
                                            type="submit" 
                                            justify='end' 
                                            class="mt-5" 
                                            fab dark small 
                                            variant="tonal" 
                                            :color="onSubmitColor"
                                        >
                                            {{ textSubmit }}
                                            <i class="bi bi-arrow-bar-right"></i>
                                        </v-btn>    
                                    </v-row>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>

    <!-- Target Input -->
    <Modal 
        title="Modal Point"
        id="modalPoint"
        size="fullscreen"
    >
        <div class="mt-5">
            <div class="row">

                <v-switch 
                    inset 
                    v-model="toogleTarget"
                    color="info"
                    :label="`${toogleTarget ? 'Target' : 'Calculator'}`" 
                ></v-switch>
                
                <div 
                    ref="target"
                    class="col-md-7"
                    style="
                        text-align: center; 
                        position: relative;
                    "
                >
                    <Target 
                        v-if="toogleTarget"
                        :target="targetResult"
                        :max="pointsData.jumlah_anakPanah"
                        @click="() => {
                            this.targetResult.sumTotal = this.targetResult.pointResult.reduce((acc, value) => acc + value, 0);
                        }"
                    />

                    <v-table v-if="!toogleTarget">
                        
                    </v-table>
                </div>
                
                <div 
                    class="col-md-5"
                >
                    <v-table>
                        <thead>
                            <tr>
                                <th>Arrows</th>
                                <th>Summary 6 Arrows</th>
                                <th>Summary 12 Arrows</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <v-table>
                                        <template v-for="i2 in (pointsData.rowAnakPanah ?? 0)">
                                            <tr>
                                            <template v-for="i3 in 6">
                                                <template v-if="(i2 - 1) * 6 + i3 <= (targetResult.pointResult ? Object.keys(targetResult.pointResult).length : 0)">
                                                    <td>
                                                        <template v-if="(targetResult.pointResult ? (targetResult.pointResult).length > 0 : 0)">
                                                            <template v-if="i2 == 2">
                                                                {{ targetResult.pointResult[(i3+6)-1] }},
                                                            </template>
    
                                                            <template v-else>
                                                                {{ targetResult.pointResult[i3-1] }},
                                                            </template>
                                                        </template>
                                                    </td>
                                                </template>
                                            </template>
                                            </tr>
                                        </template>
                                    </v-table>
                                </td>
    
                                <td>
                                    <v-table
                                        style="text-align: center;"
                                    >
                                        <template v-for="i4 in (pointsData.rowAnakPanah ?? 0)">
                                            <tr>
                                                <td>
                                                    <template v-if="(targetResult.pointResult ? (targetResult.pointResult).length > 0 : 0)">
                                                        <template v-if="i4 == 2">
                                                            {{  targetResult.pointResult.slice(6).reduce((acc, num) => acc + num, 0) }}
                                                        </template>
                                                        <template v-else>
                                                            {{ targetResult.pointResult.slice(0, 6).reduce((acc, num) => acc + num, 0) }}
                                                        </template>
                                                    </template>
                                                </td>
                                            </tr>
                                        </template>
                                    </v-table>
                                </td>
    
                                <td
                                    style="text-align: center;"
                                >
                                    {{ targetResult.sumTotal }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>

                    <div class="row">
                        <v-btn
                            justify='end' 
                            color="warning"
                            class="mt-5" 
                            fab dark small 
                            variant="tonal" 
                            @click="SetPoint"
                        >
                            Shoot Submit
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </Modal>

    <!-- Target Img Detail -->
    <Modal
        title="Modal Target Result"
        id="modalTarget"

    >
        <img 
            :src="targetImg"
        >
    </Modal>

    <!-- Modal Detail & print -->
    <Modal 
        title="Detail"
        id="modalDetail"
        size="large"
    >
        <div class="row">

            <v-row justify='end' class="mt-2">
                <v-btn
                    color="warning"
                    variant="tonal"
                    @click="onSendEmail(Point)"
                >
                    <i class="bi bi-envelope-check"></i>
                    Kirim Email
                </v-btn>

                <v-btn
                    color="info"
                    variant="tonal"
                    @click="onPrint(Point)"
                >
                    <i class="bi bi-printer"></i>
                    Print
                </v-btn>

            </v-row>


            <v-table class="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nama</th>
                        <th>Jarak</th>
                        <th>Tanggal</th>
                        <th>Jenis Busur</th>
                        <th>Rambahan</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>{{ Point.username }}</th>
                        <th>{{ Point.point_jarak }}</th>
                        <th>{{ Point.point_tanggal }}</th>
                        <th>{{ Point.jenis_busur_name }}</th>
                        <th>{{ Point.point_rambahan }}</th>
                    </tr>
                    <tr>
                        <th colspan="4">Archer Turn</th>
                        <th colspan="2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="(v,i) in Point.point_detail" 
                        :key="i"
                    >
                        <td>{{ i+1 }}.</td>
                        <td colspan="2">
                            <v-table>
                                <template v-for="i2 in Math.ceil(parseInt(Point.point_jumlah_anak_panah) / 6)">
                                    <tr>
                                        <template v-for="i3 in 6">
                                            <template v-if="(i2 - 1) * 6 + i3 <= (Point.point_jumlah_anak_panah ?? 0)">
                                                <td>
                                                    <template v-if="i2 == 1">
                                                        {{ ((v.point_detail_points).split(','))[i3] }}
                                                    </template>
                                                    <template v-else>
                                                        {{ ((v.point_detail_points).split(','))[(i3+6)] }}
                                                    </template>
                                                </td>
                                            </template>
                                        </template>
                                    </tr>
                                </template>
                            </v-table>
                        </td>
                        <td>
                            <v-table>
                                <template v-for="i2 in Math.ceil(parseInt(Point.point_jumlah_anak_panah) / 6)">
                                    <tr>
                                        <td>
                                            <template v-if="i2 == 1">
                                                {{ ((v.point_detail_points).split(',')).slice(0,6).reduce((acc, num) => parseInt(acc) + parseInt(num), 0) }}
                                            </template>
                                            <template v-else>
                                                {{ ((v.point_detail_points).split(',')).slice(6).reduce((acc, num) => parseInt(acc) + parseInt(num), 0) }}
                                            </template>
                                        </td>
                                    </tr>
                                </template>
                            </v-table>
                        </td>
                        <td>{{ v.point_detail_total }}</td>
                        <td>
                            <a 
                                data-bs-toggle="modal" 
                                data-bs-target="#modalTarget"
                                @click="detailTarget(v.point_detail_img)"
                            >
                                <img :src="v.point_detail_img" style="height: 100%;">
                            </a>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </Modal>

</template>

<script>
import html2canvas from 'html2canvas';
export default {
    data() {
        return {
            headers: [
                { key: "Point_kode", title: "Kode" },
                { key: "Point_name", title: "Point Name" },
                { key: "Point_level", title: "Level" },
                { key: "Point_order", title: "Order" },
                { key: "Point_endpoint", title: "Endpoint" },
                { key: "Point_icon", title: "Icon" },
                { key: "actions", title: "Actions", sortable: false },
            ],
            toogle: false,
            toogleTarget: true,
            Point: {
                username : '',
                point_jarak : '',
                point_tanggal : '',
                jenis_busur_name : '',
                point_rambahan : '',
                point_detail: [],
            },
            // variabel create point
            selectJenis:[],
            ap_rambahan: [],
            pointsData: [],
            targetResult:[],
            targetAllResult:[],
            targetImg: null,
            indexPoint: [], // show point
            indexPage: 1,

            isLoading: false,

            breadcrump: '',
            onSubmit: null,
            onSubmitColor: '',
            textSubmit:''
        };
    },
    mounted() {
        this.index()
    },
    methods: {
        async index(){
            await this.get()
            this.jenisbusurSelect()
            this.rambahan()

            this.pointsData.user_id = this.$dataAuth.user_id
            this.pointsData.nama = this.$dataAuth.name
            this.pointsData.tanggal = this.$helper.onDate()
        },
        async get(){
            this.isLoading = true
            if(this.indexPage == 1){
                await this.$api.get('/point?auth='+this.$dataAuth.user_id, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(response => {
                    this.indexPoint = response.data.data.data
                })
                this.isLoading = false
                return
            }

            await this.$api.get('/point?auth='+this.$dataAuth.user_id+'&page='+this.indexPage, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => {
                this.indexPoint = [
                    ...this.indexPoint,
                    ...response.data.data.data
                ]
                this.isLoading = false
            })
        },
        async create(){
            try {
                let form = this.$helper.onSubmit('PointForm')

                let data = {
                    ...form,
                    point_detail : this.targetAllResult
                }

                const response = await this.$api.post('/point', data ,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                this.get()
                this.toogleForm()
                Swal.fire(response.data.meta.message)
                
            } catch (error) {
                const err = await error
                let message = `
                    Error \n
                    ${err.message} \n
                `
                Swal.fire(message)
            }

        },
        async show(data){
            this.Point = data
        },
        async update(){
            try {
                const data = this.$helper.onSubmit('PointForm')
                const update = {
                    Point_kode   : data.Point_kode,
                    Point_name   : data.Point_name,
                    Point_parent : data.Point_parent,
                    Point_icon   : data.Point_icon,
                    Point_endpoint : data.Point_endpoint,
                }

                const response = await this.$api.put('/Point/'+data.Point_id, update,{
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                this.toogleForm()
                Swal.fire(response.data.meta.message)

            } catch (error) {
                const err = await error
                let message = `
                    Error \n
                    ${err.message} \n
                `
                Swal.fire(message)
            }
        },
        async destroy(data){
            try {
                Swal.fire({
                    title: 'Delete Data',
                    text: "Are you sure ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes !'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await this.$api.delete('/Point/'+data.Point_id,{
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        Swal.fire(response.data.meta.message)
                    }
                })
            } catch (error) {
                const err = await error
                let message = `
                    Error \n
                    ${err.message} \n
                `
                Swal.fire(message)
            }
        },
        async jenisbusurSelect(){
            const responseMenu = await this.$api.get('/jenisbusur?limit=0', {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            this.selectJenis = (responseMenu.data.data.data).map((v,i) => {
                let result = {
                    text: v.jenis_busur_name,
                    value: v.jenis_busur_id
                };

                return result;
            });
        },
        async toogleForm(){
            if(this.toogle){
                this.toogle = false
            }else{
                this.toogle = true
            }
        },
        async infinyScroll(event){
            const target = event.target;
            const scrollLeft = target.scrollLeft;
            const scrollWidth = target.scrollWidth;
            const clientWidth = target.clientWidth;

            const scrollKanan = parseInt(scrollLeft.toFixed())
            const scrollHasil = (scrollWidth - clientWidth)

            if(Math.abs(scrollKanan - scrollHasil) <= 1){
                this.indexPage++
                this.get()
            }
        },
        async rambahan(){
            const jumlahMax = 12
            for (let i = 1; i < (jumlahMax+1); i++) {
                this.ap_rambahan.push({
                    text: i.toString(),
                    value: i.toString()
                })
            }

        },
        async scrollRight() {
            this.$refs.pointScroll.scrollBy({
                top: 0,
                left: 1000,
                behavior: 'smooth',
            });
        },
        async toogleCreate(){
            console.log(this.toogleTarget);
            if(this.toogleTarget){
                this.toogleTarget = false
            }else{
                this.toogleTarget = true
            }
        },
        async saveImg(){
            const toCapture = this.$refs.target;

            html2canvas(toCapture).then((canvas) => {
                this.targetResult.imgData = canvas.toDataURL('image/png');
            });
        },
        async SetPoint(){
            await this.saveImg()
            delete this.targetResult.markers
            this.targetAllResult.push(this.targetResult)
            document.getElementById('modalPointClose').click()
        },
        async detailTarget(img){
            this.targetImg = img
        },
        async onSendEmail(data){
            console.log(data);
        },
        async onPrint(data){
            console.log(data);
        }
    },
}
</script>

<style>
.container {
  position: relative;
  height: 200px; /* Set the desired height */
}

.container > .v-progress-circular {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.v-table thead tr th{
    text-align: center !important;
    white-space: nowrap;
}
.v-table tbody tr td{
    text-align: center !important;
    white-space: nowrap;
}
.v-btn{
    margin-right: 10px;
}
</style>