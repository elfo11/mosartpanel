<template>
  <div class="container">
    <div id="pannellinoMosart" class="p-3">
      <div id="titlePanel" >Mosart Panel</div>
      <label for="selectGfx" class="pt-3">Graphic Channel:</label>
      <select class="form-select btn-sm" id="selectGfx" v-model="destination">
        <option
          :value="item.value"
          v-for="(item, k) in mosartChannels"
          :key="k"
        >
          {{ item.name }}
        </option>
      </select>

      <div v-if="destination !== 'F'">
        <div class="row align-items-end">
          <div class="col">
            <label for="selectIn">Time In:</label>
            <select class="form-select btn-sm" id="selectIn" v-model="mosartIn">
              <option value="A">AUTO+</option>
              <option value="M">MANUAL</option>
            </select>
          </div>
          <div class="col">
            <input
              class="form-control"
              type="text"
              v-if="mosartIn !== 'M'"
              v-model="FTCIn"
              @blur="changeIn"
            />
          </div>
        </div>
        <div class="row align-items-end">
          <div class="col">
            <label for="selectOut">Duration: </label>
            <select class="form-select btn-sm" id="selectOut" v-model="mosartMode">
              <option value="A">AUTOOUT</option>
              <option value="B">BACKGROUNDEND</option>
              <option value="S">STORYEND</option>
              <option value="O">OPENEND</option>
            </select>
          </div>
          <div class="col">
            <input
              class="form-control"
              type="text"
              v-if="mosartMode == 'A'"
              v-model="FTCOut"
              @blur="changeOut"
            />
          </div>
        </div>
      </div>
      {{ mosartValue }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      selectCH: "",
      mosartChannels: [
        { name: "Full", value: "F" },
        { name: "L3", value: "L" },
        { name: "AR", value: "U" },
        { name: "MPL Program", value: "W100" },
        { name: "CH1", value: "W101" },
        { name: "CH2", value: "W102" },
        { name: "CH3", value: "W103" },
        { name: "CH4", value: "W104" },
        { name: "CH5", value: "W105" },
        { name: "CH6", value: "W106" },
        { name: "CH7", value: "W107" },
        { name: "CH8", value: "W108" },
        { name: "CH9", value: "W109" },
        { name: "CH10", value: "W110" },
        { name: "CH11", value: "W111" },
        { name: "CH12", value: "W112" },
        { name: "CH13", value: "W113" },
        { name: "CH14", value: "W114" },
        { name: "CH15", value: "W115" },
        { name: "CH16", value: "W116" },
      ],
      mosartValue: "",
      FTCOut: "00:00",
      FTCIn: "00:00",
      ready: false,
    };
  },
  computed: {
    ...mapState(["selectedGFX", "modeIn", "modeOut"]),
    destination: {
      get: function () {
        return this.selectedGFX;
      },
      set: function (val) {
        this.setSelectedGFX(val);
        this.mosartSetValue();
      },
    },
    mosartIn: {
      get: function () {
        if (this.modeIn != "M") {
          return "A";
        } else {
          return this.modeIn;
        }
      },
      set: function (val) {
        this.$store.commit("setModeIn", val);
        this.mosartSetValue();
      },
    },
    mosartMode: {
      get: function () {
        if (this.modeOut != "B" && this.modeOut != "S" && this.modeOut != "O") {
          return "A";
        } else {
          return this.modeOut;
        }
      },
      set: function (val) {
        this.$store.commit("setModeOut", val);
        this.mosartSetValue();
      },
    },
  },
  beforeMount() {
    console.log("before Mount");
    this.$vizrt.payloadhosting.setFieldValueCallbacks({
      mosart: this.callbackInterface,
    });
    setTimeout(() => {
      if (this.mosartValue !== "") {
        const values = this.mosartValue.split("|");
        values[0] = values[0].replace("Mosart=", "");
        this.destination = values[0];
        this.mosartIn = values[1];
        this.mosartMode = values[2];
        if (values[1] != "M"){
          this.FTCIn = values[1];
        }
        if (values[2] != "B" && values[2] != "S" && values[2] != "O"){
          this.FTCOut = values[2];
        }
        console.log("timeout mosart");
      }
      this.ready = true;
    }, 500);
  },
  updated() {
    //   this.mosartSetValue();
  },
  methods: {
    ...mapMutations(["setSelectedGFX", "setModeIn", "setModeOut"]),
    mosartSetValue() {
      if (this.ready){
      this.mosartValue = ("Mosart=" + this.selectedGFX) + 
      (this.selectedGFX !== "F"? 
        "|" + (this.modeIn !== "M"?
          this.FTCIn:
          this.modeIn) + "|" + 
        (this.modeOut !== "O" && this.modeOut !== "S" && this.modeOut !== "B"?
        this.FTCOut:
        this.modeOut): "");
      this.$vizrt.payloadhosting.setFieldText("mosart", this.mosartValue);
      return this.mosartValue;}
    },
    callbackInterface: function () {
      this.mosartValue = this.$vizrt.payloadhosting.getFieldText("mosart");
      console.log("callback:"+this.mosartValue);
    },
    changeIn: function () {
      this.$store.commit("setModeIn", this.FTCIn);
       setTimeout(() => {
        this.mosartSetValue();
      }, 20); 
    },
    changeOut: function () {
      this.$store.commit("setModeOut", this.FTCOut);
       setTimeout(() => {
        this.mosartSetValue();
      }, 20); 
    },
  },
};
</script>

<style>
#pannellinoMosart {
  background-color: #3c3c3c;
  box-shadow: 2px 10px 20px black;
}
</style>
