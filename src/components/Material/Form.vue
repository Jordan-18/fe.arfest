<template>
    <form :id="formId">
        
        <div class="row">
            <div v-for="(v1, i1) in forms" :key="i1" :class="v1.col ? `col-md-${v1.col}` : 'col-md-12'">
                <Label v-if="v1.type != 'hidden'"
                    class="mt-3"
                    :id="v1.id"  
                    :title="v1.label"
                />

                <Text
                    v-if="v1.type == 'text'"
                    :id="v1.id"
                    :placeholder="v1.label"
                    :variants="v1.variants"
                    :readonly="v1.readonly"
                />

                <Checkbox
                    v-if="v1.type == 'checkbox'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <Radio
                    v-if="v1.type == 'radio'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <Password
                    v-if="v1.type == 'password'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <Hidden
                    v-if="v1.type == 'hidden'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <Number
                    v-if="v1.type == 'number'"
                    :id="v1.id"
                    :placeholder="v1.label"
                    :variants="v1.variants"
                />

                <Select1 
                    v-if="v1.type == 'select'"
                    :id="v1.id"
                    :placeholder="v1.label"
                    :items="v1.items"
                    :on="v1.event"
                    :function="v1.function"
                />

                <Selectmultiple 
                    v-if="v1.type == 'selectmulti'"
                    :id="v1.id"
                    :variants="v1.variants"
                    :items="v1.items"
                />

                <VText
                    v-if="v1.type == 'vtext'"
                    :id="v1.id"
                    :placeholder="v1.label"
                    :variants="v1.variants"
                    :readonly="v1.readonly"
                />

                <VCheckbox
                    v-if="v1.type == 'vcheckbox'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <VRadio
                    v-if="v1.type == 'vradio'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <VPassword
                    v-if="v1.type == 'vpassword'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <VHidden
                    v-if="v1.type == 'vhidden'"
                    :id="v1.id"
                    :placeholder="v1.label"
                />

                <VNumber
                    v-if="v1.type == 'vnumber'"
                    :id="v1.id"
                    :placeholder="v1.label"
                    :variants="v1.variants"
                />

                <VSelect1 
                    v-if="v1.type == 'vselect'"
                    :id="v1.id"
                    :variants="v1.variants"
                    :items="v1.items"
                />

                <VSelectmultiple 
                    v-if="v1.type == 'vselectmulti'"
                    :id="v1.id"
                    :variants="v1.variants"
                    :items="v1.items"
                />
                
            </div>
        </div>

        <slot></slot>
    </form>
</template>
<script>
  export default {
    props:{
        forms: Object,
        formId: String
    },
  }
</script>