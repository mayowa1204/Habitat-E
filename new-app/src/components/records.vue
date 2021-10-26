<template>
 <v-container class="mx-auto">
        <div v-if="showCurrentRecord" style= "height:8vh">
        <v-btn  @click="showCurrentRecord = false"> Back</v-btn>
        </div>
   
      <v-row v-if="showCurrentRecord" class="mx-auto">
        <v-card  style="min-height: 80vh; width: 70vw; margin:auto">
          <v-card-title style="justify-content: center">
            {{ currentRecord.memberName }}
          </v-card-title>
          <v-card-text>
          <v-row style="width:90%; margin:auto; margin-top:40px" >
          <v-col cols= "12" md= "6" style="justify-content:center">
        <h4 style="text-align: justify; line-height:2">
              Market Name: {{ currentRecord.marketName }}. <br />
              Bidding Level Name: {{ currentRecord.biddingLevelName }}. <br />
              Order ID: {{ currentRecord.orderID }} <br />
              Portfolio:{{ currentRecord.portfolio }} <br />
              Order EntryTime: {{ new Date (currentRecord.orderEntryTime).toLocaleDateString() }}<br />
              Order EntryUser: {{ currentRecord.orderEntryUser }} <br />
              Settlement Currency: {{ currentRecord.settlementCurrency }}
              <br />
              Clearing Price: {{ currentRecord.clearingPrice }}
              <br />
              Price: {{ currentRecord.price }}

              <br />
              Status: {{ currentRecord.status }}
              <br />
              Block Code: {{ currentRecord.blockCode }}
              <br />
              Block Code PRM: {{ currentRecord.blockCodePRM }}
              <br />
              </h4>
           </v-col>
           <h4 style="text-align: justify; line-height:2">
              Paradoxically: {{ currentRecord.paradoxically }}
              <br />
              Order Period ID:{{ currentRecord.orderPeriodID }}
              <br />
              Trade ID: {{ currentRecord.tradeID }}
              <br />
              EFA: {{ currentRecord.efa }}
              <br />
              Delivery Start: {{ new Date(currentRecord.deliveryStart).toLocaleDateString() }}
              <br />
              Delivery End: {{ new Date(currentRecord.deliveryEnd).toLocaleDateString() }}
              <br />
              Executed Volume: {{ currentRecord.executedVolume }}
              <br />
              Volume: {{ currentRecord.volume }}
              <br />
              Invalid: {{ currentRecord.invalid }}
              <br />
              Bid Validity: {{ currentRecord.bidValidity }}
            </h4>
               <v-col cols= "12" md= "6">
           </v-col>
          </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row class="mx-auto" v-else>
        <v-col cols="6" lg="4" v-for="record in records" :key="record.id">
          <v-card style="height: 100%; width: 100%">
            <v-card-title>{{ record.memberName }} </v-card-title>
            <v-card-text style="text-align:justify">
               Order Entry Time: {{
                new Date(record.orderEntryTime).toLocaleDateString()
              }}
              <br/>
              Settlement Currency: {{ record.settlementCurrency }}
                <br/>
             Price: {{ record.price }}
               <br/>
                Delivery Start: {{ new Date(record.deliveryStart).toLocaleDateString() }} 
               <br/>
                  DeliveryEnd: {{ new Date(record.deliveryEnd).toLocaleDateString()}}
            </v-card-text>

            <v-card-actions class="mx-auto"   style="justify-content:center" >
              <v-btn
                class="mx-auto"
                @click="setCurrentRecord(record)"
                >View Record</v-btn
              ></v-card-actions
            >
          </v-card>
        </v-col>
        <v-col  cols="12">
            <v-pagination color="#3399ff" v-model="page" :length="Math.ceil(records.length / 6 + 16)"></v-pagination>
        </v-col>
      </v-row>
  
    </v-container>
</template>
<script>
import { defineComponent,computed ,ref} from "@vue/composition-api";
import {aunctionDataStore } from "../utils/aunctionDataStore"

export default defineComponent({
    name:'Records',
    setup() {
        const page = ref(1)
        const showCurrentRecord = ref(false);
        const currentRecord = ref({});
        const records = computed(()=> {
            return aunctionDataStore.state.currentRecords.slice((page.value - 1) * 6, page.value * 6)
        })

        function setCurrentRecord(record) {
            currentRecord.value = record;
            showCurrentRecord.value = true;
        }
        return {records, showCurrentRecord, currentRecord, setCurrentRecord, page}
    },

});
</script>
