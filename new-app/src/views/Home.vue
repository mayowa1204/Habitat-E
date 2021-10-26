<template>
  <div>
    <div style="height: 10vh">
      <h2>Latest Aunction:</h2>
    </div>

    <v-row
      style="justify-content: center"
      class="mx-auto"
      v-for="aunction in aunctionData"
      :key="aunction.resource_id"
    >
      <v-card class="mx-auto" style="width: 70%; text-align: justify">
        <v-card-title class="mx-auto" style="width: 90%">
          <v-row class="mx-auto">
            <v-col class="mx-auto" cols="12" md="9">
              Aunction ID: {{ aunction.resource_id }}
              <br />
              Aunction End Date:{{ new Date(aunction.records[0].deliveryEnd).toLocaleDateString() }}
            </v-col>
            <v-col class="mx-auto" cols="12" md="3">
              <v-btn class="mx-auto" @click="viewRecords(aunction.records)">
                View Aunction records
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import { jsonp } from "vue-jsonp";
import { defineComponent, ref } from "@vue/composition-api";
import { aunctionDataStore } from "../utils/aunctionDataStore";
import router from '../router'

export default defineComponent({
  name:'Home',
  setup() {
    const aunctionData = ref([]);
    const records = ref([]);
    const showCurrentRecord = ref(false);
    const currentRecord = ref({});

    async function getAunctionData() {
      try {
          const response = await jsonp(
            "https://data.nationalgrideso.com/api/3/action/datastore_search?resource_id=6fd8e042-be27-4c67-ad59-5acdd2a7b0fd"
          );

            const metadata = {
              help: response.help,
              resource_id: response.result.resource_id,
              total: response.result.total,
              include_total: response.result.include_total,
              links: {
                start: response.result._links.start,
                next: response.result._links.next,
              },
              records: records.value,
            };
            response.result.records.forEach((record) => {
              setRecord(record)
            });

            if (!aunctionDataStore.state.aunctionData[0]) {
              aunctionDataStore.state.aunctionData.push(metadata);
            }
          aunctionData.value = aunctionDataStore.state.aunctionData;
      } catch(error){
        console.log(error)
      }
    }
    function setRecord(record){
        const result = {
            id: record["_id"],
            marketName: record["MarketName"],
            biddingLevelName: record["BiddingLevelName"],
            memberName: record["MemberName"],
            orderID: record["OrderID"],
            portfolio: record["Portfolio"],
            orderEntryTime: record["OrderEntryTime"],
            orderEntryUser: record["OrderEntryUser"],
            settlementCurrency: record["SettlementCurrency"],
            clearingPrice: record["ClearingPrice"],
            price: record["Price"],
            mar: record["MAR"],
            status: record["Status"],
            blockCode: record["BlockCode"],
            blockCodePRM: record["BlockCodePRM"],
            paradoxically: record["Paradoxically"],
            orderPeriodID: record["OrderPeriodID"],
            tradeID: record["TradeID"],
            efa: record["EFA"],
            deliveryStart: record["DeliveryStart"],
            deliveryEnd: record["DeliveryEnd"],
            executedVolume: record["ExecutedVolume"],
            volume: record["Volume"],
            invalid: record["Invalid"],
            bidValidity: record["Bid Validity"],
          };
      records.value.push(result);
    }
    async function viewRecords(allRecords){
        aunctionDataStore.state.currentRecords=allRecords
        router.push('records')
    }
    function setCurrentRecord(record) {
      currentRecord.value = record;
      showCurrentRecord.value = true;
     
    }
   getAunctionData();
    return {
      aunctionData,
      records,
      showCurrentRecord,
      currentRecord,
      setCurrentRecord,
      viewRecords,
    };
  },
});
</script>
