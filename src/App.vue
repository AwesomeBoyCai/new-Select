<template>
	<div>
		<el-input
			v-model="keyword"
			@input="filterUsers"
			placeholder="输入用户名"
			clearable
		/>
		<el-dropdown v-if="displayedUsers.length" class="dropdown">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item
					v-for="user in displayedUsers"
					:key="user.UserName"
					@click="selectUser(user)"
				>
					{{ user.UserName }} ({{ user.UserAge }}岁)
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div v-if="loading" class="loading">加载中...</div>
		<div v-if="error" class="error">{{ error }}</div>
		<div v-if="noData && !loading">没有找到数据</div>
		<div v-if="tooManyData && !loading">
			结果过多，请输入更多关键字进行筛选
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import axios from 'axios';

interface User {
	UserName: string;
	UserAge: number;
}

export default defineComponent({
	setup() {
		const keyword = ref('');
		const users = ref<User[]>([]);
		const loading = ref(false);
		const displayedUsers = ref<User[]>([]);
		const error = ref<string | null>(null);
		const noData = ref(false);
		const tooManyData = ref(false);
		const maxDisplayCount = 10; //限制

		const mockUsers: User[] = [
			{ UserName: '张三', UserAge: 25 },
			{ UserName: '李四', UserAge: 30 },
			{ UserName: '王五', UserAge: 28 },
			{ UserName: '赵六', UserAge: 35 },
			{ UserName: '小明', UserAge: 22 },
			{ UserName: '小红', UserAge: 24 },
			{ UserName: '小刚', UserAge: 26 },
			{ UserName: '小丽', UserAge: 29 },
			{ UserName: '小华', UserAge: 31 },
			{ UserName: '小杰', UserAge: 33 },
		]; // 可以继续添加更多用户 ];

		const filterUsers = () => {
			if (keyword.value.length < 1) {
				displayedUsers.value = [];
				noData.value = false;
				tooManyData.value = false;
				return;
			} // 过滤用户
			const filteredUsers = mockUsers.filter((user) =>
				user.UserName.includes(keyword.value)
			);
			if (filteredUsers.length === 0) {
				noData.value = true;
				displayedUsers.value = [];
				tooManyData.value = false;
			} else if (filteredUsers.length > maxDisplayCount) {
				displayedUsers.value = filteredUsers.slice(0, maxDisplayCount);
				tooManyData.value = true;
			} else {
				displayedUsers.value = filteredUsers;
				noData.value = false;
				tooManyData.value = false;
			}
		};

		const fetchUsers = async () => {
			if (keyword.value.length < 1) {
				users.value = [];
				noData.value = false;
				displayedUsers.value = [];
				tooManyData.value = false;
				return;
			}

			loading.value = true;
			error.value = null;
			try {
				const response = await fetch(
					`https://mock.com/getUser?keyword=${keyword.value}`
				);
				const data = await response.json();
				loading.value = false;

				if (data.Response) {
					const { Data } = data.Response;
					users.value = Data;
					if (Data.length === 0) {
						noData.value = true;
						displayedUsers.value = [];
						tooManyData.value = false;
					} else if (Data.length > maxDisplayCount) {
						displayedUsers.value = Data.slice(0, maxDisplayCount);
						tooManyData.value = true;
						noData.value = false;
					} else {
						displayedUsers.value = Data;
						noData.value = false;
						tooManyData.value = false;
					}
				}
			} catch (err) {
				loading.value = false;
				error.value = '请求失败，请稍后重试';
			}
		};

		const selectUser = (user: User) => {
			// 触发用户选择事件
			console.log('Selected user:', user);
		};

		return {
			keyword,
			users,
			loading,
			error,
			noData,
			fetchUsers,
			selectUser,
			tooManyData,
			displayedUsers,
			filterUsers,
		};
	},
});
</script>
