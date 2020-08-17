import monk from 'monk'

const URI = '/*atlas conn string*/';

const db = monk(URI);

export default db;