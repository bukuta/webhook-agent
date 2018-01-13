for k in user project projectConfig hook action task notice noticeTemplate Log env;
do
  echo $k
  sails generate controller $k
done;

