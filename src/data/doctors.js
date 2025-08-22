// dummy data for pagination (24 items)
const first = ["Anika","Farhan","Omar","Nabila","Shadman","Sajid","Ishrat","Mahir","Tamanna","Rafi","Nafisa","Ayman"];
const last  = ["Rahman","Ahmed","Siddiq","Noor","Hasan","Khan","Karim","Hossain","Islam","Chowdhury","Sultana","Rashid"];

const doctors = Array.from({ length: 24 }).map((_, i) => {
  const name = `${first[i % first.length]} ${last[i % last.length]}`;
  return {
    id: i + 1,
    name,
    email: `${name.toLowerCase().replace(/\s+/g,".")}@smilestudio.test`,
    avatar: `https://i.pravatar.cc/120?img=${(i % 70) + 1}`
  };
});

export default doctors;
