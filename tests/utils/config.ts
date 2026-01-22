//export const BASEURL = 'https://www.saucedemo.com/';

const ENV_URL ={
qa: 'https://www.saucedemo.com/' ,
dev:'https://www.saucedemo.com/',
stage:'https://www.saucedemo.com/',
prod:'https://www.saucedemo.com/'
} 

const ENV = process.env.ENV || "prod"
export const BASEURL = (ENV_URL as any)[ENV];

export const VALID_USER = 'standard_user';
export const INVALID_USER = 'standard_user_invalid';
export const PASSWORD = 'secret_sauce';
export const LOCKEDOUT_USER= 'locked_out_user'; 
export const PROBLEM_USER = 'problem_user';
export const PERFORMANCEGLITCH_USER = 'performance_glitch_user';        
export const ERROR_USER = 'error_user';
export const VISUAL_USER = 'visual_user';
