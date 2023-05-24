<template>
  <p>
    <label for="showCheckBoxes">Checkboxes</label>
    <input id="showCheckBoxes" type="checkbox" v-model="config.checkboxes" />

    <label for="padding"> | Padding</label>
    <input id="padding" type="number" v-model.number="config.padding" />

    <label for="editable"> | Editable</label>
    <input id="editable" type="checkbox" v-model="config.editable" />

    <label for="disabled"> | Disabled</label>
    <input id="disabled" type="checkbox" v-model="config.disabled" />

    <label for="keyboardNavigation"> | Keyboard Navigation</label>
    <input
      id="keyboardNavigation"
      type="checkbox"
      v-model="config.keyboardNavigation"
    />

    <label for="DragandDrop"> | DragandDrop</label>
    <input id="DragandDrop" type="checkbox" v-model="config.dragAndDrop" />

    <label for="checkMode"> | Checkmode auto</label>
    <input
      id="checkMode"
      type="checkbox"
      :value="modeBool"
      @input="changeMode"
    />
  </p>

  <tree :config="config" :nodes="nodes"> </tree>
</template>

<script>
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";

export default {
  components: {
    tree: treeview,
  },
  data: function () {
    return {
      modeBool: false,
      config: {
        roots: [],
        keyboardNavigation: false,
        dragAndDrop: false,
        checkboxes: true,
        editable: false,
        disabled: false,
        padding: 25,
      },
      nodes: {}
    };
  },
  mounted(){
    this.changeMode()
    this.index()
  },
  methods: {
    changeMode() {
      this.modeBool = !this.modeBool;
      this.config.checkMode = this.modeBool ? 0 : 1;
    },

    async index(){
      const resposne = await this.$api.get('/roleaccess/'+this.$dataAuth.access, {
          headers: {
              "Content-Type": "application/json",
          },
      })
      let data = resposne.data.data
      let children = []

      for (let key in data) {
        data[key]['children'].forEach(child => {
          children.push(child)
        });
      }

      this.nodes = data
      this.config.roots = Object.keys(data).filter(key => !children.includes(key))
    }
  },
};
</script>
