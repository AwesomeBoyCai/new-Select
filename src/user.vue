<template>
	<div>
		<el-input
			v-model="keyword"
			placeholder="输入用户名"
			@input="filterUsers"
		/>
		<el-dropdown v-if="filteredUsers.length > 0">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item
					v-for="user in filteredUsers"
					:key="user.UserName"
					@click="selectUser(user)"
				>
					{{ user.UserName }} ({{ user.UserAge }}岁)
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div v-if="noData" class="no-data">没有数据</div>
		<div v-if="loading" class="loading">加载中...</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
	ElInput,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
} from 'element-plus';

export default defineComponent({
	components: {
		ElInput,
		ElDropdown,
		ElDropdownMenu,
		ElDropdownItem,
	},
	setup() {
		const keyword = ref('');
		const users = ref([
			{ UserName: 'Alice', UserAge: 25 },
			{ UserName: 'Bob', UserAge: 30 },
			{ UserName: 'Charlie', UserAge: 28 },
			{ UserName: 'David', UserAge: 22 },
		]);
		const filteredUsers = ref([]);
		const loading = ref(false);
		const noData = ref(false);

		const filterUsers = () => {
			if (!keyword.value) {
				filteredUsers.value = [];
				noData.value = false;
				return;
			}

			loading.value = true;
			noData.value = false;

			// 模拟延迟
			setTimeout(() => {
				filteredUsers.value = users.value.filter((user) =>
					user.UserName.toLowerCase().includes(
						keyword.value.toLowerCase()
					)
				);

				noData.value = filteredUsers.value.length === 0;
				loading.value = false;
			}, 500);
		};

		const selectUser = (user: { UserName: string }) => {
			console.log('Selected User:', user.UserName);
			keyword.value = user.UserName;
			filteredUsers.value = [];
		};

		return {
			keyword,
			filteredUsers,
			loading,
			noData,
			filterUsers,
			selectUser,
		};
	},
});
</script>

<style scoped>
.no-data {
	color: red;
}
.loading {
	color: blue;
}
</style>
