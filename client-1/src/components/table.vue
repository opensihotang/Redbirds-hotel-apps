<script>
    export default{
        name : "Reusetable",
        props : ["data", "headers", "action", "statusAll"],
        emits : ["renderFormAddLodging", "handleUpdateStatusLodging"],
        data(){
            return {
              role : localStorage.getItem("role"),
              username : localStorage.getItem("username")
            }
        },
        methods : {
            async renderEditForm(value, id){
                this.$emit('renderFormAddLodging', value, id)
                // console.log(value, id, "iniiii");
            },

            async updateStatus(item){
                this.$emit("handleUpdateStatusLodging", item)
            }
        }
    }
</script>

<template>
    <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.id">{{ header }}</th>
        <th v-if="action">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td v-for="(value, key) in item" :key="key">
          <template v-if="key === 'imgUrl'">
            <img :src="value" alt="Image" class="img-table" />
          </template>
          <template v-else-if="key === 'status'">
            <template v-if="action && role === 'admin'">
              <select v-model="item.status" @change="updateStatus(item)" style="padding: 5px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px;">
                <option v-for="st in statusAll" :key="st" :value="st">
                  {{ st }}
                </option>
              </select>
            </template>
            <template v-else>
              {{ value }}
            </template>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </td>
        <td v-if="(action && role==='admin')||(role === 'staff' && item.authorId === username)">
            <button @click="renderEditForm('newlodging', item.id)" style="background-color: #4CAF50; color: white; padding: 7px 20px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Edit</button>
        </td>
          </tr>
        </tbody>
      </table>
</template>