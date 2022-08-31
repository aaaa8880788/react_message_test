import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	resolve:{
		alias:{
			'@': resolve(__dirname,'./src')
		}
	},
  css:{
		//* css模块化
		 modules: { // css模块化 文件以.module.[css|less|scss]结尾
		     generateScopedName: '[name]__[local]___[hash:base64:5]',
		     hashPrefix: 'prefix',
	    },
	    //* 预编译支持less
	     preprocessorOptions: {
		      less: {
		        // 支持内联 JavaScript
		        javascriptEnabled: true,
		      },
	    },
	}
})
